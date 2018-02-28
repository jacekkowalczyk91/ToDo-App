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



    handleAddTask = () => {
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
                <form>
                    <FormGroup
                        className='form'
                    >
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
                            onClick={this.handleAddTask}
                        >Zapisz</Button>
                    </FormGroup>

                </form>
            </div>
        )

    }
}

export default AddTask