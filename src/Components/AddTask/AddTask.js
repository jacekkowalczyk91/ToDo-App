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
        if(this.state.taskName.length >= 1 && this.state.taskDescription.length >= 1){
            event.preventDefault()
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            database().ref(`tasks/`).push({
                taskName: this.state.taskName,
                taskDescription: this.state.taskDescription,
                isDone: false,
                date: date
            })
            alert('Dodano zadanie')
        }else{
            alert('Wpisz nazwę i/lub treść zadania')
        }

    }


    render() {

        return (
            <div>
                <div>
                    <h2>Tutaj dodaj swoje zadanie</h2>
                </div>
                <form>
                    <FormGroup
                        className='form'
                    >
                        <FormControl
                            className='title'
                            type='text'
                            placeholder='nazwa zadania'
                            onChange={this.handleTaskNameInputChange}
                            value={this.state.taskName}
                        />
                        <FormControl
                            className='task-desc'
                            type='textarea'
                            placeholder='treść zadania'
                            onChange={this.handleTaskDescriptionChange}
                            value={this.state.taskDescription}
                        />
                        <Button
                            bsStyle='success'
                            onClick={this.handleAddTask}
                        >Zapisz</Button>
                    </FormGroup>

                </form>
            </div>
        )

    }
}

export default AddTask