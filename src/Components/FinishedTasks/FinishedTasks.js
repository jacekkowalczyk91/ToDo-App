import React from 'react'
import {database} from "../../firebase";

class FinishedTasks extends React.Component {

    state = {
        id: [],
        isDone: false,
        taskName: '',
        taskDescription: ''
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
            <div>
                {
                    this.state.tasks && this.state.tasks.filter(
                        ({isDone}) => (
                            isDone === true
                        )
                    ).map(({id, taskName, taskDescription, date}) => (
                        <div className='task-view' key={id}>
                            <p className="task-name"><label>Nazwa zadania:</label> {taskName}</p>
                            <p className="task-desc"><label className="label-desc">Treść zadania:</label> {taskDescription}</p>
                            <p className="task-date"><label>Data dodania zadania: </label> {date}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default FinishedTasks