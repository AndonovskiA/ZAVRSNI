import React, { Component } from "react";
import courseDataService from "../../services/Course.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { Modal } from 'react-bootstrap';


export default class Grupe extends Component {
  constructor(props) {
    super(props);
    this.dohvatiGrupe = this.dohvatiGrupe.bind(this);

    this.state = {
      grupe: [],
      prikaziModal: false
    };
  }

  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });


  componentDidMount() {
    this.dohvatiGrupe();
  }
  dohvatiGrupe() {
    GrupaDataService.getAll()
      .then(response => {
        this.setState({
          grupe: response.data
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiGrupa(sifra){
    
    const odgovor = await GrupaDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiGrupe();
    }else{
     this.otvoriModal();
    }
    
   }

  render() {
    const { grupe} = this.state;
    return (

    <Container>
      <a href="/grupe/dodaj" className="btn btn-success gumb">Dodaj novu grupu</a>
      <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Naziv</th>
                  <th>Datum početka</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
              {grupe && grupe.map((g,index) => (
                
                <tr key={index}>
                  <td> 
                    <p className="naslovSmjer">{g.naziv} ({g.brojPolaznika})</p>
                    {g.smjer}
                  </td>
                  <td className="naslovSmjer">
                    {g.datumPocetka==null ? "Nije definirano" :
                    moment.utc(g.datumPocetka).format("DD. MM. YYYY. HH:mm")}
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Link className="btn btn-primary gumb" to={`/grupe/${g.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                        { g.brojPolaznika===0 &&
                             <Button variant="danger"  className="gumb" onClick={() => this.obrisiGrupa(g.sifra)}><FaTrash /></Button>
                        }
                      </Col>
                    </Row>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>     

             <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Grupa ima polaznike.</Modal.Body>
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
