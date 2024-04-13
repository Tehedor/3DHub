import { useState, useRef } from 'react';
import { Container, Row, Col, Table,Button} from 'react-bootstrap';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {MyValidationInput} from '../../common/ValidationComponents.js';

import VerPedir from './VerPedir.js';

import PedidosService from "../../services/diseñador/pedidos.service.js";

function PedirPedido  (props) {
  const form = useRef();
  const checkBtn = useRef();
      
  // Impresora del pedido
  const numberPrinter=Number(props.printerId);
  const printer = props.printers[numberPrinter]; 

  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  const roll = props.roll;
  const query = props.query;
  const queryUbica = props.queryUbica;
  const currentUser = props.currentUser;

  const PrinterMaxUnities = printer.maxUnities;
  
  // ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Validación de los inputs
  // ##### ##### ##### ##### ##### ##### ##### ##### #####
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
    // meter la api
  };

  const validCantidad = (value) => {
    // verificame que es un numero y que este es menor que el maximo que tolera una imprsoras

    if (value > PrinterMaxUnities) {
      return (
        <div className="invalid-feedback d-block">
          Value must be less or equal than {PrinterMaxUnities}
        </div>
      );
    }


  };

  const validFechaFabricacion = (value) => {
    const fecha = new Date(value);
    const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    if (fechaSinHora <  today) {
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
  };

  const validEspecificaciones = (value) => {
    if (value.trim().length < 10) {
      return (
        <div className="invalid-feedback d-block">
          "Las especificaciones deben tener al menos 10 caracteres."
        </div>
      );
    }
  };

  
// File content
 const content = `Tamaño: original \nColor: ${printer.color.split(",")[0]} \nMaterial: ${printer.material.split(",")[0]}`

  // ####### ####### ####### ####### ####### ####### ####### ####### #######
  // ####### ####### Variables input    ####### ####### ####### ####### #######
  // ####### ####### ####### ####### ####### ####### ####### ####### #######
  const [file, setFile] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [especificaciones, setEspecificaciones] = useState(content);

  // const fechaActual = new Date().toISOString().split('T')[0];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // const [fechaFabricacion, setFechaFabricacion] = useState(now);
  const fechaFabricacion = useRef();
  const [fechaEntrega, setFechaEntrega] = useState(now);  


  // ####### ####### ####### ####### ####### ####### ####### ####### #######
  // ####### ####### Variables control    ####### ####### ####### ####### #######
  // ####### ####### ####### ####### ####### ####### ####### ####### #######

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  
  // ####### ####### ####### ####### ####### ####### ####### ####### #######
  // ####### ####### Handel    ####### ####### ####### ####### #######
  // ####### ####### ####### ####### ####### ####### ####### ####### #######

  const handlePedido = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      PedidosService.añadirPedido(file, cantidad, fechaFabricacion.current, fechaEntrega, especificaciones, printer.id).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
        console.log("file: ", file);
      }
  };


  return (
    
  <Container>
    <Row class="impresora-caracteristicas">
      <VerPedir printer={printer}/>
    </Row>
    
    <Form onSubmit={handlePedido} ref={form}>
      {!successful && (
        <Row>   
          <Col lg={3} className="reseñas order-3 order-lg-1">
          reseñas
          </Col>
          <Col lg={6} className="central order-1 order-lg-2">
            <Row class="subir">          
            {/* ########## */}
            {/*  SUBIR FIL */}
            {/* ########## */}
              <MyValidationInput
                type="file" 
                formlabel="Subir file" 
                onChange={(e) => setFile(e.target.files[0])}
                // validations={[required]} 
              />
            </Row>
            <Row>
              {/* ################ */}
              {/* ESPECIFICACIONES */}
              {/* ################ */}
              <MyValidationInput
                as="textarea"
                formlabel="Especificaciones del pedido"
                rows={7}
                maxLength={400}
                value={especificaciones}
                onChange={e => setEspecificaciones(e.target.value)}
                validations={[required,validEspecificaciones]} // Agrega tus validaciones aquí
              />
            </Row>
          </Col>
          <Col lg={3} className="derecha order-2 order-lg-3">
            <Row class="Tabla">
              <Table striped bordered hover variant="gray">
                <tbody>
                  <tr>
                    <td>Cantidad</td>
                    <td>
                      {/* ########## */}
                      {/* CANTIDAD */}
                      {/* ########## */}
                      <MyValidationInput
                        type="number" 
                        max={PrinterMaxUnities} 
                        min="0" 
                        value={cantidad} 
                        onChange={e => setCantidad(e.target.value)}
                        validations={[required,validCantidad]} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Límite de fabricación</td>
                    <td>
                      {/* ################## */}
                      {/* LIMITE FABRICACION */}
                      {/* ################## */}
                      <MyValidationInput
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
                      {/* ############## */}
                      {/* LIMITE ENTREGA */}
                      {/* ############## */}
                      <MyValidationInput
                        type="date" 
                        name="fechaEntrega" 
                        onChange={e => setFechaEntrega(e.target.value)}
                        validations={[required, validFechaEntrega]}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className="Añadir" style={{display: 'flex', alignItems: 'flex-end'}}>
                    {/* ############# */}
                    {/* Añadir Carrito*/}
                    {/* ############# */}
              <Button variant="success" onClick={handlePedido}>Añadir al Carrito</Button>
              <p></p>
                    {/* ############# */}
                    {/*    Vovler     */}
                    {/* ############# */}
              <Button href="/" variant="danger">Vover</Button>
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