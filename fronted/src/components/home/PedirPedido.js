import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import { MyValidationInput } from '../../common/ValidationComponents.js';

import VerPedir from './VerPedir.js';

import PedidosService from "../../services/diseñador/pedidos.service.js";

import DragAndDrop from './../../common/DragAndDrop.js';
import ReseñaLista from './ReseñaLista.js';

import AuthService from '../../services/auth.service.js';
import { isEmpty } from 'validator';

function PedirPedido(props) {
  const form = useRef();
  const checkBtn = useRef();

  // Impresora del pedido
  const numberPrinter = Number(props.printerId);
  console.log("numberPrinter: ", numberPrinter);
  const printer = props.printers[numberPrinter];
  console.log("printer: ", printer);
  const fabricantes = props.controlFabricantes;
  console.log("fabricante: ", fabricantes);

  const searchFabricante = (printer) => {
    const idFabricante = printer.idFabricante;
    for (let i = 0; i < fabricantes.length; i++) {
      console.log(fabricantes[i]);
      if (fabricantes[i].id == idFabricante) {
        console.log(fabricantes[i]);
        return fabricantes[i];
      }
    }
  }
  const fabricante = searchFabricante(printer);

  // Raings 
  // productRating
  const allratings = props.ratings ? props.ratings : [];
  console.log(allratings);

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

  // const validFile = (value) => {
  //   // console.console.log("validFile");
  //   // meter la api
  // };
  function validateFile(value) {
    const allowedFormats = ['obj', '3mf', 'stl'];
    const fileExtension = value.name.split('.').pop();
    if (!allowedFormats.includes(fileExtension)) {
      return (
        <div className="invalid-feedback d-block">
          Invalid file format. Allowed formats are {allowedFormats.join(', ')}.
        </div>
      );
    }
    if (value.length === 0) {
      return (
        <div className="invalid-feedback d-block">
          File is empty.
        </div>
      );
    }
    if (Array.isArray(value) && value.length > 1) {
      return (
        <div className="invalid-feedback d-block">
          Only one file can be uploaded at a time.
        </div>
      );
    }

    return true;
  }
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
    if (fechaSinHora < today) {
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
  // const [address, setAddress] = useState("");
  const [address, setAddress] = useState(JSON.parse(localStorage.getItem("usuarioDescargado")) ? (JSON.parse(localStorage.getItem("usuarioDescargado"))).address : "");



  // ####### ####### ####### ####### ####### ####### ####### ####### #######
  // ####### ####### Variables control    ####### ####### ####### ####### #######
  // ####### ####### ####### ####### ####### ####### ####### ####### #######

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(true);
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
      setLoading(true); // Iniciar el loading
      PedidosService.añadirPedido(file, cantidad, fechaFabricacion.current, fechaEntrega, especificaciones, printer.id, address).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false); // Detener el loading
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
          setLoading(false); // Detener el loading
        }
      );
      // console.log("file: ", file);
    }
  };

  console.log(props.cambioRoll);
  console.log(AuthService.getCurrentUser());

  return (

    <Container>
      <Row class="impresora-caracteristicas">
        <VerPedir printer={printer} ratings={allratings} fabricantes={fabricante} />
      </Row>

      {loading ?
        <Col>
          <Row className="d-flex justify-content-center align-items-center">
            <Button variant="secondary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "10px" }} // Agrega un margen a la derecha
              />
              Cargando...
            </Button>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <img
              id="loading"
              src={process.env.PUBLIC_URL + "/spinners/patitosusio.gif"}
              className="spinner"
              alt="spinner"
              style={{ width: "27%", height: "auto" }}
            />
          </Row>
        </Col>
        :
        <Container>
          {(props.cambioRoll === "DESIGNER" && AuthService.getCurrentUser() && Object.keys(AuthService.getCurrentUser()).length !== 0) ? (
            <Form onSubmit={handlePedido} ref={form}>
              {!successful && (
                <Container>
                  <Row>
                    <Col lg={3} className="reseñas order-3 order-lg-1">
                      {/* ########## */}
                      {/*  SUBIR FIL */}
                      {/* ##########
                  <MyValidationInput
                    type="file"
                    formlabel="Subir file"
                    value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                    // validations={[required, validateFile]}
                  // validations={[required]} 
                  /> */}
                      <MyValidationInput
                        type="file"
                        formlabel="Subir file"
                        onChange={(e) => setFile(e.target.files[0])}
                      // validations={[required]} 
                      />

                      {/* <DragAndDrop 
                      type="file"
                      formlabel="Subir file"
                      value={file}
                      // setFile={setFile}
                      // file={file}
                      onChange={(e) => setFile(e.target.files[0])}
                      validations={[required, validateFile]}
                    />  */}
                    </Col>
                    <Col lg={6} className="central order-1 order-lg-2">
                      {/* ######### */}
                      {/* DIRECCION */}
                      {/* ######### */}
                      <Row class="subir">
                        <MyValidationInput
                          as="textarea"
                          formlabel="Especificaciones del pedido"
                          rows={1}
                          maxLength={40}
                          value={address}
                          placeholder="Dirección de entrega"
                          onChange={e => setAddress(e.target.value)}
                          validations={[required]} // Agrega tus validaciones aquí
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
                          validations={[required, validEspecificaciones]} // Agrega tus validaciones aquí
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
                                  validations={[required, validCantidad]}
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
                                  onChange={e => { fechaFabricacion.current = e.target.value }}
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
                      <Row className="Añadir" style={{ display: 'flex', alignItems: 'flex-end' }}>
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
                </Container>

              )}
              {
                message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                    {successful ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/patitotabien.gif"} className="spinner" alt="spinner" style={{ width: "23%", height: "auto" }} /> : <img id="loading" src={process.env.PUBLIC_URL + "/spinners/patitoguerra.gif"} className="spinner" alt="spinner" style={{ width: "23%", height: "auto" }} />}
                  </div>
                )
              }
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form >
          ) : null}
          <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: '10px' }}>
            <ReseñaLista printer={printer} ratings={allratings} numberPrinter={numberPrinter}  fabricantes={fabricante}/>
          </Row>
        </Container>
      }
    </Container >
  );
}

export default PedirPedido;