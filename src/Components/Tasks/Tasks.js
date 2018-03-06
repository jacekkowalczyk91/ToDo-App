import React from 'react'

import {
    Button
} from 'react-bootstrap'

import {database} from '../../firebase'
import './Tasks.css'

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
            <div className='opening'>
                <h1>Lista zadań: </h1>
                <div className='view'>
                    {
                        this.state.tasks && this.state.tasks.map(
                            ({id, taskName, taskDescription, date, isDone}) => (
                                <div className='task-view' key={id}>
                                    <p className="task-name"><label>Nazwa zadania:</label> {taskName}</p>
                                    <p className="task-desc"><label className="label-desc">Treść zadania:</label> {taskDescription}</p>
                                    <p className="task-date"><label>Data dodania zadania </label> {date}</p>
                                    <Button
                                        bsStyle="danger"
                                        className="delete-button"
                                        onClick={() => {
                                            this.handleRemoveTask(id)
                                        }}
                                    >Usuń</Button>
                                    <Button
                                        bsStyle="primary"
                                        onClick={() => {
                                            this.handleToggleDone(id, isDone)
                                        }}
                                    >{
                                        isDone ?
                                            'Niegotowe' :
                                            'Gotowe'
                                    }</Button>
                                    <EditTask
                                        bsStyle="info"
                                        task={{id, taskName, taskDescription, date, isDone}}/>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Tasks