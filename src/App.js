import React, {Component} from 'react';
import './App.css';
import AddTask from './Components/AddTask'
import MainMenu from './Components/MainMenu'
import Tasks from './Components/Tasks'

import { Grid } from 'react-bootstrap'

import {
    BrowserRouter as Router, Route
}from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Router>
                <Grid>
                    <MainMenu/>
                    <Route exact path='/' component={Tasks}/>
                    <Route exact path='/AddTask' component={AddTask}/>
                </Grid>
            </Router>
        )
    }
}

export default App;
