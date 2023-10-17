import React, { Component } from "react";
import studentDataService from "../../services/Student.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changestudent extends Component {

  constructor(props) {
    super(props);

    this.student = this.getStudent();
    this.changeStudent = this.changeStudent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      student: {}
    };
  }


  async getStudent() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await studentDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          student: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeStudent(student) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await studentDataService.put(niz[niz.length-1],student);
    if(answer.ok){
      window.location.href='/students';
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

    this.changeStudent({
      First_Name: datainfo.get('First name'),
      Last_Name: datainfo.get('Last name'),
      Address: datainfo.get('Address'),
      OIB: datainfo.get('OIB'),
      Contact_Number: datainfo.get('Contact number'),
      Date_of_Enrollment: datainfo.get('Date of enrollment')
    });
    
  }


  render() {
    
    const {student} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="First name">
                <Form.Label>First_Name</Form.Label>
                <Form.Control type="text" name="first name" placeholder="Anja" maxLength={30} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="Last name">
                <Form.Label>Last_Name</Form.Label>
                <Form.Control type="text" name="last name" placeholder="Petakić" required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="somewhat street "required />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="oib">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="oib" placeholder="" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact number">
                <Form.Label>Contact_Number</Form.Label>
                <Form.Control type="text" name="contact number" placeholder="99999999999"required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="date of enrollment">
                <Form.Label>Date_of_Enrollment</Form.Label>
                <Form.Control type="text" name="date of enrollment" placeholder="05.08.2023" required/>
              </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/students`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Change student 
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

