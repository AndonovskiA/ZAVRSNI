import React, { Component } from "react";
import categoryDataService from "../../services/Category.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class AddCategory extends Component {

    constructor(props) {
      super(props);
      this.AddCategory = this.AddCategory.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async AddCategory(course) {
      const answer = await categoryDataService.post(course);
      if(answer.ok){
        // routing na tečaj
        window.location.href='/categories';
      }else{
        // pokaži grešku
        console.log(answer);
      }
    }
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.AddCategory({
        NAME: datainfo.get('Name'),
        PRICE: datainfo.get('Price'),
        NUMBER_OF_TR_LECTURES: datainfo.get('Number of tr lectures'),
        NUMBER_OF_DL: datainfo.get('Number od driving lessions')
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
    
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>NAME</Form.Label>
                <Form.Control type="text" name="name" placeholder="something" maxLength={255} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>PRICE</Form.Label>
                <Form.Control type="decimal" name="price" placeholder="350.50" required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="number of tl lectures">
                <Form.Label>NUMBER_OF_TR_LECTURES</Form.Label>
                <Form.Control type="text" name="number od tl lectures" placeholder="50" required />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="number of driving lessions">
                <Form.Label>NUMBER_OF_DL</Form.Label>
                <Form.Control type="text" name="number of driving lessions" placeholder="50" required />
              </Form.Group>



              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/categories`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add Category
                </Button>
                </Col>
              </Row>
             
              
            </Form>
    
    
          
        </Container>
        );
      }
    }
    
    