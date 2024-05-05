import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";


import { Row, Col } from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

import { MyValidationInput } from '../../../common/ValidationComponents.js';

import ImpresorasService from "../../../services/fabricante/impresoras.fabri.service.js";

export default function CrearImpresora(props) {


  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  // ##### ##### ##### Variables de control 
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  // ##### ##### ##### Variables Impresora 
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  const [modelName, setModelName] = useState("");
  const [printerLocation, setPrinterLocation] = useState("");
  const [printerType, setPrinterType] = useState("");
  const [printerPhoto, setPrinterPhoto] = useState(null);
  const [servicePrice, setServicePrice] = useState("");
  const [maxUnities, setMaxUnities] = useState("");
  const [manufacturationSpeed, setManufacturationSpeed] = useState("");
  const [material, setMaterial] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [printerPrecision, setPrinterPrecision] = useState("");
  const [color, setColor] = useState("");





  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  // ##### ##### ##### Requisitos
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };
  const validAddress = (value) => {
    if (value.length < 5 && value.length > 0) {
      return (
        <div className="invalid-feedback d-block">
          The address must be at least 5 characters long.
        </div>
      );
    }
  };
  const navigate = useNavigate();

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  // ##### ##### Handle
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
  const handleRegisterPrinter = (e) => {
    e.preventDefault();


    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      ImpresorasService.createPrinter(modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material, maxWidth, maxHeight, printerPrecision, color).then(
        (response) => {
          setMessage(response.data.message);
          navigate("/");
          window.location.reload();
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
    }
  };

  return (
    <Form onSubmit={handleRegisterPrinter} ref={form}>
      {!successful && (
        <Col>
          <Row> <h2><strong>Añdir Impresora</strong></h2></Row>
          <Row class="modelname">
            {/* ############# */}
            {/* NOMBRE MODELO */}
            {/* ############# */}
            <div className="form-group">
              <label htmlFor="modelName">Nombre del modelo</label>
              <Input
                type="text"
                className="form-control"
                name="modelName"
                value={modelName}
                onChange={e => setModelName(e.target.value)}
                validations={[required]}
              />
            </div>
          </Row>
          <Row class="subir">
            {/*  ########### */}
            {/*  SUBIR photo */}
            {/*  ########### */}

            <MyValidationInput
              type="file"
              formlabel="Subir foto"
              onChange={(e) => setPrinterPhoto(e.target.files[0])}
            // validations={[required]} 
            />
          </Row>
          <Row class="printerlocation">
            {/* ############################ */}
            {/* LOCALIZACIÓN DE LA IMPRESORA */}
            {/* ############################ */}
            <div className="form-group">
              <label htmlFor="printerLocation">Dirección de la impresora</label>
              <Input
                type="text"
                className="form-control"
                name="printerLocation"
                value={printerLocation}
                onChange={e => setPrinterLocation(e.target.value)}
                validations={[required, validAddress]}
              />
            </div>
          </Row>

          <Row>
            <Col md={6}>
              <Row className="printertype">
                {/* #################### */}
                {/* TIPO DE LA IMPRESORA */}
                {/* #################### */}
                <div className="form-group">
                  <label htmlFor="printerType">Tipo de impresora</label>
                  <Select
                    className="form-control"
                    name="printerType"
                    value={printerType}
                    onChange={e => setPrinterType(e.target.value)}
                    validations={[required]}
                  >
                    <option value="">Seleccione el tipo de impresora</option>
                    <option value="FDM">FDM - Deposición de material Fundido</option>
                    <option value="SLA">SLA - Resina (Estereolitografia)</option>
                    <option value="MSLA">MSLA - Máscara de Sombra de Matriz de Pixeles</option>
                    <option value="DLP">DLP - Resina (Procesamiento Digital de Luz)</option>
                    <option value="SLS">SLS - Sintetización Selectiva por laser</option>
                    <option value="MJ">MJ - Inyección de Material</option>
                    <option value="MJF">MJF - Fusión Multijet</option>
                  </Select>
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <Row class="maxunities">
                {/* ######## */}
                {/* CANTIDAD */}
                {/* ######## */}
                <div className="form-group">
                  <label htmlFor="maxUnities">Máximas unidades</label>
                  <MyValidationInput
                    type="number"
                    // max={5000} 
                    min="0"
                    value={maxUnities}
                    onChange={e => setMaxUnities(e.target.value)}
                    validations={[required]}
                  />
                </div>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Row>
                {/* ########## */}
                {/* MATERIALES */}
                {/* ########## */}
                <div className="form-group">
                  <label htmlFor="material">Materiales</label>
                  <Select
                    className="form-control"
                    name="material"
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                    validations={[required]}
                  >
                    <option value="">Seleccione material</option>
                    <option value="PLASTIC">Plástico</option>
                    <option value="RESIN">Resina</option>
                  </Select>
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                {/* ##### */}
                {/* COLOR */}
                {/* ##### */}
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <Select
                    className="form-control"
                    name="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    validations={[required]}
                  >
                    <option value="">Seleccione Color</option>
                    <option value="GREEN">Verde</option>
                    <option value="YELLOW">Amarillo</option>
                    <option value="BLUE">Azul</option>
                    <option value="RED">Rojo</option>
                    <option value="BLACK">Negro</option>
                    <option value="WHITE">Blanco</option>
                    <option value="ORANGE">Naranja</option>
                    <option value="PURPLE">Morado</option>
                    <option value="PINK">Rosa</option>
                    <option value="BROWN">Marron</option>
                  </Select>
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {/* ###################### */}
              {/* VELOCIDAD DE IMRPESIÓN */}
              {/* ###################### */}
              <label htmlFor="maxUnities">Velocidad De Impresión</label>
              <Input
                type="number"
                step="any"
                className="form-control"
                name="manufacturationSpeed"
                value={manufacturationSpeed}
                onChange={e => setManufacturationSpeed(e.target.value)}
                validations={[required]}
              />
            </Col>

            <Col md={6}>
              {/* ######################### */}
              {/* PRECISIÓN DE LA IMPRESORA */}
              {/* ######################### */}
              <label htmlFor="printerPrecision">Precisión de la impresora</label>
              <MyValidationInput
                type="number"
                // max={5000} 
                min="0"
                value={printerPrecision}
                onChange={e => setPrinterPrecision(e.target.value)}
                validations={[required]}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Row class="maxwidth">
                {/* ############ */}
                {/* ANCHO MÁXIMO */}
                {/* ############ */}
                <label htmlFor="maxWidth">Ancho máximo</label>
                <MyValidationInput
                  type="number"
                  // max={5000} 
                  min="0"
                  value={maxWidth}
                  onChange={e => setMaxWidth(e.target.value)}
                  validations={[required]}
                />
              </Row>
            </Col>
            <Col md={6}>
              <Row class="maxheight">
                {/* ########### */}
                {/* ALTO MÁXIMO */}
                {/* ########### */}
                <label htmlFor="maxHeight">Alto máximo</label>
                <MyValidationInput
                  type="number"
                  // max={5000} 
                  min="0"
                  value={maxHeight}
                  onChange={e => setMaxHeight(e.target.value)}
                  validations={[required]}
                />
              </Row>
            </Col>

          </Row>





          <Row class="serviceprice">
          </Row>
          <div className="form-group">
            <label htmlFor="addres">Precio servicio</label>
            <Input
              type="number"
              step="0.001"
              min="0"
              className="form-control"
              name="servicePrice"
              value={servicePrice}
              onChange={e => setServicePrice(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <button className="btn btn-primary btn-block">Crear Impresora</button>
          </div>
        </Col>
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


  );

}
// {
//     "modelName":"Impresora1",
//     "printerLocation":"Madrid",
//     "printerType":"Normal",
//     "printerPhoto":null,
//     "servicePrice":9.0,
//     "maxUnities":2,
//     "manufacturationSpeed":"3",
//     "material":"plastico"

// }