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
            taskName: this.state.taskName
        }
        tasks.push(task)
        this.setState({
            taskName: ''
        })
    }

    componentDidMount() {
        const tasks = database().ref('tasks');
        tasks.on('value', (snapshot) => {
            let tasks = snapshot.val();
            let newState = [];
            for (let task in tasks) {
                newState.push({
                    id: task,
                    taskName: tasks[task].taskName
                });
            }
            this.setState({
                tasks: newState
            });
        });
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
                    <div>
                        <ul>
                            {
                                this.state.tasks && this.state.tasks.map(
                                    ({id, taskName}) => (
                                        <li key={id}>{taskName}</li>

                                    )
                                )
                            }
                        </ul>

                    </div>
                </form>
            </div>
        )

    }
}

export default AddTask