import React, { Component } from "react";
import instructorDataService from "../../services/Instructor.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

export default class Instructors extends Component {
    constructor(props) {
      super(props);
      this.addInstructors = this.getInstructors.bind(this);
  
      this.state = {
        instructos: [],
        showModal: false
      };
    }

    openModal = () => this.setState({ showModal: true });
    closeModal = () => this.setState({ showModal: false });
    
    componentDidMount() {
        this.getInstructors();
      }
      getInstructors() {
        instructorDataService.getAll()
          .then(response => {
            this.setState({
              instructors: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      async deleteInstructor(ID){
    
        const answer = await instructorDataService.delete(ID);
        if(answer.ok){
         this.getInstructors();
        }else{
         // alert(odgovor.poruka);
          this.openModal();
        }
        
       }

       render() {
        const {instructors} = this.state;
        return (
    
        <Container>
          <a href="/instructors/add" className="btn btn-success gumb">Add new instructor</a>
        <Row>
          { instructors && instructors.map((i) => (
               
               <Col key={i.ID} sm={12} lg={3} md={3}>
    
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{s.First_Name} {s.Last_Name}</Card.Title>
                      <Card.Text>
                        {i.Driver_License_Number} {i.EMAIL} {i.Contact_Number}
                      </Card.Text>
                      <Row>
                          <Col>
                          <Link className="btn btn-primary gumb" to={`/instructors/${i.ID}`}><FaEdit /></Link>
                          </Col>
                          <Col>
                          <Button variant="danger" className="gumb"  onClick={() => this.deleteInstructor(i.ID)}><FaTrash /></Button>
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
