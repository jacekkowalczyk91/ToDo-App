import React from 'react'

import {
    Button
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

    handleCheckbox = (id, event) => {
        // event.preventDefault()
        // const task = this.state.tasks.find(task => task.id === id)

        this.setState({
            isDone: !this.state.isDone
        });
        console.log('zmiana stanu')
        database().ref(`/tasks/` + id).set({isDone: false})

        // database().ref().child(`/tasks/${id}`).update({isDone:!this.state.isDone})
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

    render() {
        return (
            <div className='view'>
                {
                    this.state.tasks && this.state.tasks.map(
                        ({id, taskName, taskDescription}) => (
                            <div>
                                <p key={id}>{taskName}{taskDescription}</p>
                                <Button
                                    onClick={() => {
                                        this.handleRemoveTask(id)
                                    }}
                                >Usuń</Button>
                                <Button
                                    onClick={this.handleCheckbox}
                                >{
                                    this.state.isDone ?
                                        'mark as undone' :
                                        'mark as done'
                                }</Button>
                            </div>
                        )
                    )
                }

            </div>
        )
    }
}

export default Tasks