import React, { Component } from "react";
import vehicleDataService from "../../services/vehicle.service";
import studentDataService from "../../services/student.service";
import instructorDataService from "../../services/instructor.service";
import categoryDataService from "../../services/category.service";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';


export default class ChangeCourse extends Component {

  constructor(props) {
    super(props);

    

  //  console.log('Konstruktor PromjeniGrupa');

    

    this.course = this.getcourse();
    this.changeCourse = this.changeCourse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.vehicles = this.getVehicles();
    this.students = this.getStudents();
    //ovo vidi jel ti treba
    //this.obrisiStudent = this.deleteStudent.bind(this);
    //this.searchStudent = this.searchStudent.bind(this);
    //this.addStudent = this.addStudent.bind(this);


    this.state = {
      course: {},
      students: [],
      vehicles: [],
      instructors: [],
      categores: [],
      //IDvehicle:0, i mozda ostalo
      //foundStudents: []
    };
  }




  async getCourse() {
    // ovo mora bolje
    //console.log('Dohvaćam grupu');
    let href = window.location.href;
    let niz = href.split('/'); 
    await courseDataService.getByID(niz[niz.length-1])
      .then(response => {
        let g = response.data;
        g.startTime = moment.utc(g.startTime).format("HH:mm");
        g.startDate = moment.utc(g.startDate).format("yyyy-MM-DD");
        
        //console.log(g.vrijemePocetka);
        this.setState({
          course: co
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  async changeCourse(course) {
    const answer = await courseDataService.post(course);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/course';
    }else{
      // pokaži grešku
      console.log(answer);
    }
  }

  // pitaj profa jel da dohvacam sve 4 bindane veze na course
  // također za search i delete
  async dohvatiSmjerovi() {
    console.log('Dohvaćm smjerove');
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

  async dohvatiPolaznici() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await GrupaDataService.getPolaznici(niz[niz.length-1])
       .then(response => {
         this.setState({
           polaznici: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   

   async traziPolaznik( uvjet) {

    await PolaznikDataService.traziPolaznik( uvjet)
       .then(response => {
         this.setState({
          pronadeniPolaznici: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   async obrisiPolaznika(grupa, polaznik){
    const odgovor = await GrupaDataService.obrisiPolaznika(grupa, polaznik);
    if(odgovor.ok){
     this.dohvatiPolaznici();
    }else{
     //this.otvoriModal();
    }
   }

   async dodajPolaznika(grupa, polaznik){
    const odgovor = await GrupaDataService.dodajPolaznika(grupa, polaznik);
    if(odgovor.ok){
     this.dohvatiPolaznici();
    }else{
    //this.otvoriModal();
    }
   }
 

  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('datumPocetka'));
    console.log(podaci.get('vrijeme'));
    let datum = moment.utc(podaci.get('datumPocetka') + ' ' + podaci.get('vrijeme'));
    console.log(datum);

    this.promjeniGrupa({
      naziv: podaci.get('naziv'),
      datumPocetka: datum,
      sifraSmjer: this.state.sifraSmjer
    });
    
  }


  render() { 
    const { smjerovi} = this.state;
    const { grupa} = this.state;
    const { polaznici} = this.state;
    const { pronadeniPolaznici} = this.state;


    const obradiTrazenje = (uvjet) => {
      this.traziPolaznik( uvjet);
    };

    const odabraniPolaznik = (polaznik) => {
      //console.log(grupa.sifra + ' - ' + polaznik[0].sifra);
      if(polaznik.length>0){
        this.dodajPolaznika(grupa.sifra, polaznik[0].sifra);
      }
     
    };

    return (
    <Container>
       
        <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col key="1" sm={12} lg={6} md={6}>
              <Form.Group className="mb-3" controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" placeholder="" maxLength={255} defaultValue={grupa.naziv}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="smjer">
                <Form.Label>Smjer</Form.Label>
                <Form.Select defaultValue={grupa.sifraSmjer}  onChange={e => {
                  this.setState({ sifraSmjer: e.target.value});
                }}>
                {smjerovi && smjerovi.map((smjer,index) => (
                      <option key={index} value={smjer.sifra}>{smjer.naziv}</option>

                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="datumPocetka">
                <Form.Label>Datum početka</Form.Label>
                <Form.Control type="date" name="datumPocetka" placeholder="" defaultValue={grupa.datumPocetka}  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="vrijeme">
                <Form.Label>Vrijeme</Form.Label>
                <Form.Control type="time" name="vrijeme" placeholder="" defaultValue={grupa.vrijemePocetka}  />
              </Form.Group>

            



              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/grupe`}>Odustani</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Promjeni grupu
                </Button>
                </Col>
              </Row>
          </Col>
          <Col key="2" sm={12} lg={6} md={6} className="polazniciGrupa">
          <Form.Group className="mb-3" controlId="uvjet">
                <Form.Label>Traži polaznika</Form.Label>
                
          <AsyncTypeahead
            className="autocomplete"
            id="uvjet"
            emptyLabel="Nema rezultata"
            searchText="Tražim..."
            labelKey={(polaznik) => `${polaznik.prezime} ${polaznik.ime}`}
            minLength={3}
            options={pronadeniPolaznici}
            onSearch={obradiTrazenje}
            placeholder="dio imena ili prezimena"
            renderMenuItemChildren={(polaznik) => (
              <>
                <span>{polaznik.prezime} {polaznik.ime}</span>
              </>
            )}
            onChange={odabraniPolaznik}
          />
          </Form.Group>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Polaznik</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
              {polaznici && polaznici.map((polaznik,index) => (
                
                <tr key={index}>
                  <td > {polaznik.ime} {polaznik.prezime}</td>
                  <td>
                  <Button variant="danger"   onClick={() => this.obrisiPolaznika(grupa.sifra, polaznik.sifra)}><FaTrash /></Button>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>    
          </Col>
          </Row>

          
         
          
        </Form>


      
    </Container>
    );
  }
}

