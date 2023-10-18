import React, { Component } from "react";
import GrupaDataService from "../../services/grupa.service";
import SmjerDataService from "../../services/smjer.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';



export default class addCourse extends Component {

  constructor(props) {
    super(props);
    this.addCourse = this.addCourse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.getStudent = this.getStudents.bind(this);
    // this.getCategory= this.getCategories.bind(this);
    // this.getInstructor= this.getInstructors.bind(this);
    this.state = {
      smjerovi: [],
      sifraSmjer:0,
      IDStudents:0,
      students
    };
  }

  componentDidMount() {
    //console.log("Dohvaćam smjerove");
    this.dohvatiSmjerovi();
    //dohvati sve sto mi treba
  }

  async dodajGrupa(grupa) {
    const odgovor = await GrupaDataService.post(grupa);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/grupe';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }


  async dohvatiSmjerovi() {

    await SmjerDataService.get()
      .then(response => {
        this.setState({
          smjerovi: response.data,
          sifraSmjer: response.data[0].sifra
        });

       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('datumPocetka'));
    console.log(podaci.get('vrijeme'));
    let datum = moment.utc(podaci.get('datumPocetka') + ' ' + podaci.get('vrijeme'));
    console.log(datum);

    this.dodajGrupa({
      naziv: podaci.get('naziv'),
      datumPocetka: datum,
      sifraSmjer: this.state.sifraSmjer
    });
    
  }


  render() { 
    const { smjerovi} = this.state;
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="" maxLength={255} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="smjer">
            <Form.Label>Smjer</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifraSmjer: e.target.value});
            }}>
            {smjerovi && smjerovi.map((smjer,index) => (
                  <option key={index} value={smjer.sifra}>{smjer.naziv}</option>

            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="datumPocetka">
            <Form.Label>Datum početka</Form.Label>
            <Form.Control type="date" name="datumPocetka" placeholder=""  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="vrijeme">
            <Form.Label>Vrijeme</Form.Label>
            <Form.Control type="time" name="vrijeme" placeholder=""  />
          </Form.Group>

         



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/grupe`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj grupu
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

