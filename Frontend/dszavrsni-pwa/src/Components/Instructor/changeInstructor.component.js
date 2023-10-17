import React, { Component } from "react";
import instructorDataService from "../../services/Instructor.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changeInstructor extends Component {

  constructor(props) {
    super(props);

    this.instructor = this.getInstructor();
    this.changeInstructor = this.changeInstructor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      instructor: {}
    };
  }


  async getInstructor() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await instructorDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          instructor: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeInstructor(student) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await instructorDataService.put(niz[niz.length-1],student);
    if(answer.ok){
      window.location.href='/instructors';
    }else{
      // pokaži grešku
      console.log(answer);
    }
  }


  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const datainfo = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.changeInstructor({
      First_Name: datainfo.get('First name'),
      Last_Name: datainfo.get('Last name'),
      Driver_License_Number: datainfo.get('Driver licence number'),
      EMAIL:datainfo.get("e-mail"),
      Contact_Number: datainfo.get('Contact number'),
    });
    
  }


  render() {
    
    const {instructor} = this.state;

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
              Change instructor
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

