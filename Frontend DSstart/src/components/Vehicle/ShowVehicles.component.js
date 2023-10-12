import React, { Component } from "react";
import PolaznikDataService from "../../services/polaznik.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.getVehicles = this.detVehicles.bind(this);

    this.state = {
      vehicles: [],
      showModal: false
    };
  }



  openModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false });

  componentDidMount() {
    this.getVehicles();
  }
  getVehicles() {
    VehicleDataService.getAll()
      .then(response => {
        this.setState({
          vehicles: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async deleteVehicle(ID){
    
    const answer = await VehicleDataService.delete(ID);
    if(answer.ok){
     this.getVehicles();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { vehicles} = this.state;
    return (

    <Container>
      <a href="/vehicles/add" className="btn btn-success gumb">Add new vehicle</a>
    <Row>
      { vehicles && vehicles.map((p) => (
           
           <Col key={v.ID} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.ime} {p.prezime}</Card.Title>
                  <Card.Text>
                    {p.email}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/polaznici/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiPolaznik(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>


      <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Polaznik se nalazi na jednoj ili više grupa i ne može se obrisati.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}
