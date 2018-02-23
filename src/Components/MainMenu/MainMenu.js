import React from 'react'
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap'

import {
    LinkContainer
} from 'react-router-bootstrap'


const MainMenu = () => (
    <Navbar style={{BorderRadiusBottom:10,
        background: 'white',
        width: '100%'
    }}>
        <Navbar.Header>

        </Navbar.Header>
        <Navbar.Toggle/>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Zadania</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/AddTask">
                    <NavItem>Dodaj zadanie</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/FinishedTasks">
                    <NavItem>Ukończone zadania</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default MainMenu


