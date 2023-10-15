import React, { Component } from "react";
import categoryDataService from "../../services/category.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

export default class Categories extends Component {
    constructor(props) {
      super(props);
      this.addCategory = this.getCategories.bind(this);
  
      this.state = {
        categories: [],
        showModal: false
      };
    }

    openModal = () => this.setState({ showModal: true });
    closeModal = () => this.setState({ showModal: false });
    
    componentDidMount() {
        this.getStudents();
      }
      getStudents() {
        categoryDataService.getAll()
          .then(response => {
            this.setState({
              categories: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      async deleteCategory(ID){
    
        const answer = await categoryDataService.delete(ID);
        if(answer.ok){
         this.getCategory();
        }else{
         // alert(odgovor.poruka);
          this.openModal();
        }
        
       }

       render() {
        const {categories} = this.state;
        return (
    
        <Container>
          <a href="/categories/add" className="btn btn-success gumb">Add new category</a>
        <Row>
          { categories && categories.map((c) => (
               
               <Col key={c.ID} sm={12} lg={3} md={3}>
    
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
