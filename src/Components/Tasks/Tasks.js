import React from 'react'

import {
    Button
} from 'react-bootstrap'

import {database} from '../../firebase'

import EditTask from '../../Components/EditTask'

class Tasks extends React.Component {

    state = {
        id: [],
        isDone: false
    }

    handleRemoveTask = (id) => {
        database().ref(`/tasks/${id}`).set(null)
    }

    handleToggleDone = (id, isDone) => {
        database().ref(`/tasks/${id}/`).update({
            isDone: !isDone
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
                    taskName: tasks[task].taskName,
                    taskDescription: tasks[task].taskDescription,
                    date: tasks[task].date,
                    isDone: tasks[task].isDone
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
                        ({id, taskName, taskDescription, date, isDone}) => (
                            <div key={id}>
                                <p><label>Nazwa zadania:</label> {taskName}</p>
                                <p><label>Treść zadania:</label> {taskDescription}</p>
                                <p><label>Data dodania zadania </label> {date}</p>
                                <Button
                                    onClick={() => {
                                        this.handleRemoveTask(id)
                                    }}
                                >Usuń</Button>
                                <Button
                                    onClick={() => {
                                        this.handleToggleDone(id, isDone)
                                    }}
                                >{
                                    isDone ?
                                        'undone' :
                                        'done'
                                }</Button>
                                <EditTask task={{id, taskName, taskDescription, date, isDone}}/>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default Tasks