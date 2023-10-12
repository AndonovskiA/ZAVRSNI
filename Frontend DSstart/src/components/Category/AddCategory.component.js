import React, { Component } from "react";
import SmjerDataService from "../../services/smjer.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class DodajSmjer extends Component {

  constructor(props) {
    super(props);
    this.dodajSmjer = this.dodajSmjer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajSmjer(smjer) {
    const odgovor = await SmjerDataService.post(smjer);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/smjerovi';
    }else{
      // pokaži grešku
     // console.log(odgovor.poruka.errors);
      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
         // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
        }
      }

      alert(poruke);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    let trajanje=0;
    if (podaci.get('trajanje').trim().length>0){
     trajanje = parseInt(podaci.get('trajanje'))
    }

    this.dodajSmjer({
      naziv: podaci.get('naziv'),
      trajanje: trajanje,
      cijena: parseFloat(podaci.get('cijena')),
      upisnina: parseFloat(podaci.get('upisnina')),
      verificiran: podaci.get('verificiran')==='on' ? true : false
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="Naziv smjera" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="trajanje">
            <Form.Label>Trajanje</Form.Label>
            <Form.Control type="text" name="trajanje" placeholder="130" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="text" name="cijena" placeholder="500" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="upisnina">
            <Form.Label>Upisnina</Form.Label>
            <Form.Control type="text" name="upisnina" placeholder="50" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="verificiran">
            <Form.Check
            inline
            label="Verificiran"
            name="verificiran"
          />
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/smjerovi`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj smjer
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

