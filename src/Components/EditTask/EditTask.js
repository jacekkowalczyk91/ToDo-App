import React from 'react'
import {database} from './../../firebase'

import {
    Button,
    FormControl,
    FormGroup,
    Modal
} from 'react-bootstrap'


class EditTask extends React.Component {

    state = {
        show: false,
        taskName: '',
        taskDescription: ''
    }

    handleEditedTaskName = (event) => {
        this.setState({
            taskName: event.target.value
        })
    }

    handleEditedTaskDesc = (event) => {
        this.setState({
            taskDescription: event.target.value
        })
    }

    handleUpdateTask = (id) => {

        database().ref(`/tasks/${id}`).update({
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription
        })

        this.setState({
            show: false
        })
        console.log(this.props)
    }

    render() {

        let close = () => this.setState({show: false});

        return (
            <div className='edit-view'>
                {
                            <div className="modal-container">
                                <Button
                                    bsStyle='info'
                                    onClick={() => this.setState({show: true})}
                                >
                                    Edytuj
                                </Button>
                                <Modal
                                    show={this.state.show}
                                    onHide={close}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">Edytuj zadanie</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <form>
                                                <FormGroup>
                                                    <FormControl type="text" placeholder="Nazwa zadania..."
                                                                 value={this.state.taskName}
                                                                 onChange={this.handleEditedTaskName}/>
                                                </FormGroup>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <FormControl onChange={this.handleEditedTaskDesc}
                                                                 style={{height: 100}}
                                                                 componentClass="textarea"
                                                                 placeholder="Opis zadania..."
                                                                 value={this.state.taskDescription}/>
                                                </FormGroup>
                                            </form>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button bsStyle="primary" onClick={() => {this.handleUpdateTask(this.props.task.id)}}
                                        >Zapisz</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                }
            </div>
        )
    }
}

export default EditTask