import React, {Component} from 'react';
import './App.css';
import AddTask from './Components/AddTask'
import MainMenu from './Components/MainMenu'
import Tasks from './Components/Tasks'

import { Grid } from 'react-bootstrap'

import {
    BrowserRouter as Router, Route
}from 'react-router-dom'
import FinishedTasks from "./Components/FinishedTasks";


class App extends Component {
    render() {
        return (
            <Router>
                <Grid>
                    <MainMenu/>
                    <Route exact path='/' component={Tasks}/>
                    <Route exact path='/AddTask' component={AddTask}/>
                    <Route exact path='/FinishedTasks' component={FinishedTasks}/>
                </Grid>
            </Router>
        )
    }
}

export default App;
