import React, { Component } from "react";
import instructorDataService from "../../services/Instructor.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class AddInstructor extends Component {

    constructor(props) {
      super(props);
      this.AddInstructor = this.AddInstructor.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async AddInstructor(course) {
      const answer = await instructorDataService.post(course);
      if(answer.ok){
        // routing na tecaj
        window.location.href='/instructors';
      }else{
        // pokaži grešku
        console.log(answer);
      }
    }
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.AddInstructor({
      First_Name: datainfo.get('First name'),
      Last_Name: datainfo.get('Last name'),
      Driver_License_Number: datainfo.get('Driver licence number'),
      EMAIL:datainfo.get("e-mail"),
      Contact_Number: datainfo.get('Contact number'),
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
            <Form.Group className="mb-3" controlId="First name">
                <Form.Label>First_Name</Form.Label>
                <Form.Control type="text" name="first name" placeholder="Petak" maxLength={30}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Last name">
                <Form.Label>Last_Name</Form.Label>
                <Form.Control type="text" name="last name" placeholder="Petakić"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="driver license number">
                <Form.Label>Driver_License_Number</Form.Label>
                <Form.Control type="text" name="driver licence number" placeholder="6546464 "/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="EMAIL">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="EMAIL" placeholder="abcd.pet@gmail.com"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact number">
                <Form.Label>Contact_Number</Form.Label>
                <Form.Control type="text" name="contact number" placeholder="1234567890"/>
            </Form.Group>
        
              
            <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/instructors`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add instrctor
                </Button>
                </Col>
            </Row>
             
              
            </Form>
    
          
        </Container>
        );
    }
}
    
    