import { useState, useRef } from 'react';
import { Navbar, Nav , FormControl, Card, Container, Row, Col, InputGroup, Image, Table, FormControlm, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './PedirPedido.css';
// import DatePicker from "react-bootstrap-date-picker";

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { useValidation } from 'react-validation';


import Ver from '../VerPedir';

import AuthService from "../../../services/diseñador/auth.service";

function PedirPedido  (props) {
  const form = useRef();
  const checkBtn = useRef();
      
  // Impresora del pedido
  const printer = props.printers[Number(props.printerId)]; 
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
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


  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  /////////////////////7Elemeneto de validación necesarios para sustituir componetes react-validation//////////////////////////////////////////////////////7
  // const [especificaciones, setEspecificaciones] = useState('');
  const { validate, getErrorMessages } = useValidation();

  // const handleEspecificacionesChange = e => {
  //   const value = e.target.value;
  //   validate(validEspecificaciones, value);
  //   setEspecificaciones(value);
  // };
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7



  // validación de los inputs //////////////////////////////////////////////////////7
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  const validFile = (value) => {
    // console.console.log("validFile");
  };

  const validCantidad = (value) => {
    // verificame que es un numero y que este es menor que el maximo que tolera una imprsoras
    if (value < 1) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
    
    if (value > printer.Unidades_max) {
      return (
        <div className="invalid-feedback d-block">
          Value must be less than {printer.Unidades_max}
        </div>
      );
    }


  };

  const validFechaFabricacion = (value) => {
    const fecha = new Date(value);
    const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    if (fechaSinHora <  today) {
    // if (new Date(value).getTime() < Date.now()) {
      return (
        <div className="invalid-feedback d-block">
          Imposible to fabricate in the past!
        </div>
      );
    }
  };
  
  const validFechaEntrega = (value) => {
    const fecha = new Date(value);
    const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    
    const fechaFabricacionAux = new Date(fechaFabricacion.current);
    const fechaFabricacionSinHora = new Date(fechaFabricacionAux.getFullYear(), fechaFabricacionAux.getMonth(), fechaFabricacionAux.getDate());

    if (fechaSinHora < today) {
      return (
        <div className="invalid-feedback d-block">
          Imposible to deliver in the past!
        </div>
      );
    }

    if (fechaSinHora < fechaFabricacionSinHora) {
      return (
        <div className="invalid-feedback d-block">
          Imposible to deliver before fabricate!
        </div>
      );
    }
    // return(
    //   <div>
    //     {fechaSinHora.toLocaleDateString()} 
    //     <p> </p>
    //     {fechaFabricacionSinHora.toLocaleDateString()}
    //   </div>
    // );
  };

  const validEspecificaciones = (value) => {
    if (value.trim().length < 10) {
      return "Las especificaciones deben tener al menos 10 caracteres.";
    }
  };

  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  
  const [file, setFile] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [especificaciones, setEspecificaciones] = useState(null);

  // const fechaActual = new Date().toISOString().split('T')[0];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // const [fechaFabricacion, setFechaFabricacion] = useState(now);
  const fechaFabricacion = useRef();
  const [fechaEntrega, setFechaEntrega] = useState(now);  

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // const handlePedido = (e) => {
  //   console.log("handlePedido");

  // }
  
  
  
    const handlePedido = (e) => {
      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) {
        // AuthService.order(file, cantidad, fechaFabricacion, fechaEntrega, especificaciones).then(
        //   (response) => {
        //     setMessage(response.data.message);
        //     setSuccessful(true);
        //   },
        //   (error) => {
        //     const resMessage =
        //       (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //       error.message ||
        //       error.toString();

        //     setMessage(resMessage);
        //     setSuccessful(false);
        //   }
        // );
        console.log("file: ", file);
      }
    };


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
    
    <Form onSubmit={handlePedido} ref={form}>
      {!successful && (
      <Row>
        <Col sm={3} class="reseñas">
          reseñas
        </Col>
        <Col sm={6} class="central">
        <Input 
      type="file" 
      onChange={(e) => setFile(e.target.files[0])}
      validations={[required]} 
    />
          {/* <Row class="subir">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Subir file</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}/>
            </Form.Group>
          </Row> */}
          <Row>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> */}
              {/* <Form.Label>Especificaciones del pedido</Form.Label> */}
              <Input 
                type="formFile" 
                style={{ height: '7em', width: '100%' }}
                maxLength={400} 
                value={especificaciones} 
                onChange={e => setEspecificaciones(e.target.value)}
                validations={[required, validEspecificaciones]} 
              />

            {/* </Form.Group> */}
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
                    <Input 
                        type="number" 
                        max={printer.Unidades_max+3} 
                        min="0" 
                        value={cantidad} 
                        onChange={e => setCantidad(e.target.value)}
                        validations={[required, validCantidad]} 
                      />
                      {/* <p> Max:{printer.Unidades_max}</p> */}
                  </td>
                </tr>
                <tr>
                  <td>Límite de fabricación</td>
                  {/* <td>Inpur de fecha</td> */}
                  {/* <td><DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} /></td> */}
                  <td>
                    {/* <input type="date" name="fecha" /> */}
                    {/* <input type="date" name="fecha" value={fechaFabricacion} onChange={e => setFechaFabricacion(e.target.value)} /> */}
                    <Input 
                      type="date" 
                      name="fechaFabricacion" 
                      // value={fechaFabricacion} 
                      onChange={e => {fechaFabricacion.current = e.target.value}}
                      // onChange={e => setFechaFabricacion(e.target.value)}
                      validations={[required, validFechaFabricacion]} 
                    />

                  </td>
                </tr>
                <tr>
                  <td>Límite de entrega</td>
                  <td>
                  <Input 
                      type="date" 
                      name="fechaEntrega" 
                      // value={fechaEntrega} 
                      onChange={e => setFechaEntrega(e.target.value)}
                      validations={[required, validFechaEntrega]} 
                    />
                    {/* <input type="date" name="fecha" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} /> */}
                    {/* <input type="date" name="fecha" value={fechaEntrega} /> */}
                  </td>
                  
                  {/* <td>Inpur de fecha</td> */}
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="Añadir" style={{display: 'flex', alignItems: 'flex-end'}}>
            {/* <Button variant="success" >Añadir al Carrito</Button> */}
            {/* <Button variant="success" onClick={() => alert(`File: ${file}, Cantidad: ${cantidad}, Fecha de Fabricación: ${fechaFabricacion}, Fecha de Entrega: ${fechaEntrega}, Especificaciones: ${especificaciones}`)}>Añadir al Carrito</Button> */}
            <div className="form-group">
                <button className="btn btn-primary btn-block">Añadir al Carrito</button>
            </div>
          
            {/* <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button> */}

          </Row>
        
        </Col>
      </Row>
      )}
    {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
    )}
    <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  </Container>
  );
}

export default PedirPedido;