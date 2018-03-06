import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'

import {database} from '../../firebase'
import './AddTask.css'
import * as moment from 'moment'

class AddTask extends React.Component {

    state = {
        id: '',
        taskName: '',
        taskDescription: '',
    }

    handleTaskNameInputChange = (event) => {
        this.setState({
            taskName: event.target.value,
        });
    }
    handleTaskDescriptionChange = (event) => {
        this.setState({
            taskDescription: event.target.value
        });
    }



    handleAddTask = (event) => {
        event.preventDefault()
        let date = moment().format('MMMM Do YYYY, h:mm:ss a')
        database().ref(`tasks/`).push({
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            isDone: false,
            date: date
        })
    }

    render() {

        return (
            <div>
                <div>
                    <h3>Tutaj dodaj swoje zadanie</h3>
                </div>
                <form>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='nazwa zadania'
                            onChange={this.handleTaskNameInputChange}
                            value={this.state.taskName}
                        />
                        <FormControl
                            type='textarea'
                            placeholder='treść zadania'
                            onChange={this.handleTaskDescriptionChange}
                            value={this.state.taskDescription}
                        />
                        <Button
                            className='btn-add-task'
                            // bsStyle='primary'
                            onClick={this.handleAddTask}
                        >Zapisz</Button>
                    </FormGroup>

                </form>
            </div>
        )

    }
}

export default AddTask