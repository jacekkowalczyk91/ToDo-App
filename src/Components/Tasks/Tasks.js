import React from 'react'

import {
    Button,
    FormControl
} from 'react-bootstrap'

import {database} from '../../firebase'

class Tasks extends React.Component {

    state = {
        id: '',
        isDone: false
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
                    taskName: tasks[task].taskName,
                    taskDescription: tasks[task].taskDescription
                });
            }
            this.setState({
                tasks: newState
            });
        });
    }

    render(){
        return (
            <div className='view'>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskName, taskDescription}) => (
                            <div>
                                <p key={id}>{taskName}</p>
                                <p key={id}>{taskDescription}</p>
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
        )
    }
}

export default Tasks