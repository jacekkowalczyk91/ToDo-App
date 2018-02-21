import React from 'react'
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap'

import {database} from '../../firebase'

class AddTask extends React.Component {

    state = {
        id: '',
        taskName: ''
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
            name: this.state.taskName
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
                    <FormGroup>
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