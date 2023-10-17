import React, { Component } from "react";
import vehicleDataService from "../../services/Vehicle.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changeVehicle extends Component {

  constructor(props) {
    super(props);

    this.vehicle = this.getVehicle();
    this.changeVehicle = this.changeVehicle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      vehicle: {}
    };
  }


  async getVehicle() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await vehicleDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          vehicle: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeVehicle(vehicle) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await vehicleDataService.put(niz[niz.length-1],vehicle);
    if(answer.ok){
      window.location.href='/vehicles';
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

    this.changeVehicle({
      TYPE: datainfo.get('TYPE'),
      BRAND: datainfo.get('BRAND'),
      MODEL: datainfo.get('MODEL'),
      PURCHASE_DATE: datainfo.get('PURCHASE_DATA'),
      DATE_OF_REGISTRATION: datainfo.get('DATE_OF_REGISTRATION')
    });
    
  }


  render() {
    
    const {vehicle} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="type">
                <Form.Label>TYPE</Form.Label>
                <Form.Control type="text" name="type" placeholder="karavan" maxLength={50} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>BRAND</Form.Label>
                <Form.Control type="text" name="brand" placeholder="310B" />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="model">
                <Form.Label>MODEL</Form.Label>
                <Form.Control type="text" name="model" placeholder="50-1" />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="purchase date">
                <Form.Label>PURCHASE_DATE</Form.Label>
                <Form.Control type="text" name="purchase date" placeholder="" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="date of registration">
                <Form.Label>DATE_OF_REGISTRATION</Form.Label>
                <Form.Control type="text" name="date_of_registration" placeholder="12.12.2023."required />
              </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vehicles`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Change vehicle 
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

