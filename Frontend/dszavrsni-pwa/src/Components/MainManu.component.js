import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//import logo from '../logo.svg';

export default class MainMenu extends Component{


    render(){
        return (

            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> DS Start</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="Tu isto nesto">
                  <Nav.Link href="/nadzornaploca">ControlBoard</Nav.Link>
                  <NavDropdown title="Select" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/vehicles">Vehicles</NavDropdown.Item>
                    <NavDropdown.Item href="/students">
                      Students
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/instructors">Instructors</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/course">Courses</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item target="_blank" href="/swagger/index.html">
                      Swagger
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>



        );
    }
}
