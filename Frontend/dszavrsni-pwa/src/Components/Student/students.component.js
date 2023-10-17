import React, { Component } from "react";
import studentDataService from "../../services/Student.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

export default class Students extends Component {
    constructor(props) {
      super(props);
      this.addStudent = this.getStudents.bind(this);
  
      this.state = {
        students: [],
        showModal: false
      };
    }

    openModal = () => this.setState({ showModal: true });
    closeModal = () => this.setState({ showModal: false });
    
    componentDidMount() {
        this.getStudents();
      }
      getStudents() {
        studentDataService.getAll()
          .then(response => {
            this.setState({
              students: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      async deleteStudent(ID){
    
        const answer = await studentDataService.delete(sifra);
        if(odgovor.ok){
         this.getStudents();
        }else{
         // alert(odgovor.poruka);
          this.openModal();
        }
        
       }

       render() {
        const {students} = this.state;
        return (
    
        <Container>
          <a href="/students/add" className="btn btn-success gumb">Add new student</a>
        <Row>
          { students && students.map((s) => (
               
               <Col key={s.ID} sm={12} lg={3} md={3}>
    
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{s.First_Name} {s.Last_Name}</Card.Title>
                      <Card.Text>
                        {s.Address} {s.OIB} {s.Contact_Number} {s.Date_of_enrollment}
                      </Card.Text>
                      <Row>
                          <Col>
                          <Link className="btn btn-primary gumb" to={`/students/${s.ID}`}><FaEdit /></Link>
                          </Col>
                          <Col>
                          <Button variant="danger" className="gumb"  onClick={() => this.deleteStudent(s.ID)}><FaTrash /></Button>
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
