import React, { Component } from "react";
import vehicleDataService from "../../services/Vehicles.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

export default class Vehicless extends Component {
    constructor(props) {
      super(props);
      this.addVehicle = this.getVehicles.bind(this);
  
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
        vehicleDataService.getAll()
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
    
        const answer = await vehicleDataService.delete(ID);
        if(odgovor.ok){
         this.getVehicles();
        }else{
         // alert(odgovor.poruka);
          this.openModal();
        }
        
       }

       render() {
        const {vehicles} = this.state;
        return (
    
        <Container>
          <a href="/vehicles/add" className="btn btn-success gumb">Add new vehicle</a>
        <Row>
          { vehicles && vehicles.map((v) => (
               
               <Col key={v.ID} sm={12} lg={3} md={3}>
    
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{v.TYPE} {v.BRAND}</Card.Title>
                      <Card.Text>
                        {v.MODEL} {v.PURCHASE_DATE} {v.DATE_OF_REGISTRATION}
                      </Card.Text>
                      <Row>
                          <Col>
                          <Link className="btn btn-primary gumb" to={`/vehicles/${v.ID}`}><FaEdit /></Link>
                          </Col>
                          <Col>
                          <Button variant="danger" className="gumb"  onClick={() => this.deleteVehicle(v.ID)}><FaTrash /></Button>
                          </Col>
                        </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          }
          </Row>
    
          <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>There has been an error while executing delete action</Modal.Title>
              </Modal.Header>
              <Modal.Body>Bla bla</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}
