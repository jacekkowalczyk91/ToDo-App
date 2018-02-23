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

    handleRemoveTask = (id) => {
        database().ref(`/tasks/${id}`).set(null)
    }

    handleCheckbox = (id) => {
        this.setState({
            isDone: !this.state.isDone
        })
        database().ref().child(`/tasks/${id}`).update({isDone:this.state.isDone})
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
                    <div className='view'>
                        {
                            this.state.tasks && this.state.tasks.map(
                                ({id, taskName}) => (
                                    <div>
                                        <p key={id}>{taskName}</p>
                                        <Button
                                            onClick={() => {
                                                this.handleRemoveTask(id)
                                            }}
                                        >Usuń</Button>
                                        <FormControl
                                            type='checkbox'
                                            onClick={() => {this.handleCheckbox(id)}}
                                            defaultChecked={this.state.isDone}
                                        />
                                    </div>
                                )
                            )
                        }

                    </div>
                </form>
            </div>
        )

    }
}

export default AddTask