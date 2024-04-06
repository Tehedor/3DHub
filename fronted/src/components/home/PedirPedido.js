import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Card, Container, Row, Col, InputGroup, Image, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './PedirPedido.css';
// import DatePicker from "react-bootstrap-date-picker";
import Ver from './Ver';


// function NavigationBar( props) {
// function PedirPedido  ({ roll, query, setQuery, queryUbica, setQueryUbica, currentUser, logOut }) {
function PedirPedido  (props) {

  const roll = props.roll;
  const query = props.query;
  const queryUbica = props.queryUbica;
  const currentUser = props.currentUser;

  if (roll == "ROLE_USER") {
    roll = "diseñador";
  } 
  if (roll == "ROLE_ADMIN") {
    roll = "fabricante";
  }
  // roll = "fabricante";


  const printer = props.printers[Number(props.printerId)]; 

  const [file, setFile] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [fechaFabricacion, setFechaFabricacion] = useState(null);
  const [fechaEntrega, setFechaEntrega] = useState(null);  
  const [especificaciones, setEspecificaciones] = useState(null);

  return (
  <Container>
    <Row class="impresora-caracteristicas">
      <Ver printer={printer}/>
      {/* <Col sm={3} class="imagen">
        <Image src={printers.Imagen} thumbnail />
      </Col>
      <Col sm={9}>
        <Card.Text>Stock: {printers.Nombre_modelo}</Card.Text>
      </Col> */}
    </Row>
    <Row>
      <Col sm={3} class="reseñas">
        reseñas
      </Col>
      <Col sm={6} class="central">
        <Row class="subir">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Subir file</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Especificaciones del pedido</Form.Label>
            <Form.Control as="textarea" rows={7} maxLength={5000} value={especificaciones} onChange={e => setEspecificaciones(e.target.value)}/>
          </Form.Group>
        </Row>
      </Col>
      <Col sm={3} class="derecha">
        <Row class="Tabla">
        <Table striped bordered hover variant="gray">
            <tbody>
              <tr>
                <td>Cantidad</td>
                <td>
                  {/* <input type="number" max={printer.Unidades_max} min="1" placeholder="1"/> */}
                  <input type="number" max={printer.Unidades_max} min="1" value={cantidad} onChange={e => setCantidad(e.target.value)}/>

                </td>
              </tr>
              <tr>
                <td>Límite de fabricación</td>
                {/* <td>Inpur de fecha</td> */}
                {/* <td><DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} /></td> */}
                <td>
                  {/* <input type="date" name="fecha" /> */}
                  <input type="date" name="fecha" value={fechaFabricacion} onChange={e => setFechaFabricacion(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Límite de entrega</td>
                <td>
                  <input type="date" name="fecha" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
                  {/* <input type="date" name="fecha" value={fechaEntrega} /> */}
                </td>
                
                {/* <td>Inpur de fecha</td> */}
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row className="Añadir" style={{display: 'flex', alignItems: 'flex-end'}}>
            {/* <Button variant="success" >Añadir al Carrito</Button> */}
            <Button variant="success" onClick={() => alert(`File: ${file}, Cantidad: ${cantidad}, Fecha de Fabricación: ${fechaFabricacion}, Fecha de Entrega: ${fechaEntrega}, Especificaciones: ${especificaciones}`)}>Añadir al Carrito</Button>
        </Row>
      </Col>
    </Row>
  </Container>
  );
}

export default PedirPedido;