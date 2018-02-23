import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'

import {database} from '../../firebase'
import './AddTask.css'

class AddTask extends React.Component {

    state = {
        id: '',
        taskName: '',
        isDone: false
    }

    handleTaskNameInputChange = (event) => {
        this.setState({
            taskName: event.target.value
        });
    }

    handleAddTask = (event) => {
        event.preventDefault()
        const tasks = database().ref('tasks')
        const task = {
            taskName: this.state.taskName,
            isDone: this.state.isDone
        }
        tasks.push(task)
        this.setState({
            taskName: ''
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