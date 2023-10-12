import React, { Component } from "react";
import SmjerDataService from "../../services/smjer.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class PromjeniSmjer extends Component {

  constructor(props) {
    super(props);

   
    this.smjer = this.dohvatiSmjer();
    this.promjeniSmjer = this.promjeniSmjer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      smjer: {}
    };

  }



  async dohvatiSmjer() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await SmjerDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          smjer: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async promjeniSmjer(smjer) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await SmjerDataService.put(niz[niz.length-1],smjer);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/smjerovi';
    }else{
      // pokaži grešku
      console.log(odgovor);
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

    this.promjeniSmjer({
      naziv: podaci.get('naziv'),
      trajanje: parseInt(podaci.get('trajanje')),
      cijena: parseFloat(podaci.get('cijena')),
      upisnina: parseFloat(podaci.get('upisnina')),
      verificiran: podaci.get('verificiran')==='on' ? true : false
    });
    
  }


  render() {
    
   const { smjer} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="Naziv smjera"
            maxLength={255} defaultValue={smjer.naziv} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="trajanje">
            <Form.Label>Trajanje</Form.Label>
            <Form.Control type="text" name="trajanje" defaultValue={smjer.trajanje}  placeholder="130" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="text" name="cijena" defaultValue={smjer.cijena}  placeholder="500" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="upisnina">
            <Form.Label>Upisnina</Form.Label>
            <Form.Control type="text" name="upisnina" defaultValue={smjer.upisnina}  placeholder="50" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="verificiran">
            <Form.Check defaultChecked={smjer.verificiran}
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
              Promjeni smjer
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

