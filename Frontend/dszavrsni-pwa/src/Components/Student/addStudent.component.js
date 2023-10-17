import React, { Component } from "react";
import studentDataService from "../../services/Student.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class AddStudent extends Component {

    constructor(props) {
      super(props);
      this.AddStudent = this.AddStudent.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async AddStudent(course) {
      const odgovor = await studentDataService.post(course);
      if(odgovor.ok){
        // routing na tecaj
        window.location.href='/students';
      }else{
        // pokaži grešku
        console.log(odgovor);
      }
    }
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.addStudent({
        FIRST_NAME: datainfo.get('First name'),
        Last_Name: datainfo.get('Last name'),
        Address: datainfo.get('Address'),
        OIB: datainfo.get('OIB'),
        Contact_Number: datainfo.get('Contact number'),
        Date_of_Enrollment: datainfo.get('Date of enrollment')
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
    
              <Form.Group className="mb-3" controlId="First name">
                <Form.Label>First_Name</Form.Label>
                <Form.Control type="text" name="first name" placeholder="Anja" maxLength={255} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="Last name">
                <Form.Label>Last_Name</Form.Label>
                <Form.Control type="text" name="last name" placeholder="Petakić" required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="somewhat street " />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="oib">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="oib" placeholder="" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact number">
                <Form.Label>Contact_Number</Form.Label>
                <Form.Control type="text" name="cpntact number" placeholder="99999999999" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="date of enrollment">
                <Form.Label>Date_of_Enrollment</Form.Label>
                <Form.Control type="text" name="date of enrollment" placeholder="05.08.2023" />
              </Form.Group>


              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/students`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add Student
                </Button>
                </Col>
              </Row>
             
              
            </Form>
    
    
          
        </Container>
        );
      }
    }
    
    