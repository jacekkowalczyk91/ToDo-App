import React, {Component} from 'react';
import './App.css';
import AddTask from './Components/AddTask'

import { Grid } from 'react-bootstrap'

import {
    BrowserRouter as Router, Route
}from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Router>
                <Grid>
                    <Route path='/' component={AddTask}/>
                </Grid>
            </Router>
        )
    }
}

export default App;
