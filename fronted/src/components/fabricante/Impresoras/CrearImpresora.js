import React, { useState, useRef } from "react";
import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {MyValidationInput} from '../../../common/ValidationComponents.js';
// import {MyValidationInput} from '../../ValidationComponents.js';


import ImpresorasService from "../../../services/fabricante/impresoras.fabri.service.js";

export default function CrearImpresora(props) {
    const form = useRef();
    const checkBtn = useRef();
    
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    

    const [modelName, setModelName] = useState("");
    const [printerLocation, setPrinterLocation] = useState("");
    const [printerType, setPrinterType] = useState("");
    const [printerPhoto, setPrinterPhoto] = useState(null);
    const [servicePrice, setServicePrice] = useState("");
    const [maxUnities, setMaxUnities] = useState("");
    const [manufacturationSpeed, setManufacturationSpeed] = useState("");
    const [material, setMaterial] = useState("");

    
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

    const handleRegisterPrinter = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        ImpresorasService.createPrinter(modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material).then(
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
      }
    };

    return(
      <Form onSubmit={handleRegisterPrinter} ref={form}>
        {!successful && (
          <Col>
          <Row> Añdir Impresora</Row>
          <Row class="subir">          
            {/*  SUBIR photo */}
            <MyValidationInput
              type="file" 
              formlabel="Subir foto" 
              onChange={(e) => setPrinterPhoto(e.target.files[0])}
              // validations={[required]} 
            />
          </Row>
          <Row class="modelname">
            {/* NOMBRE MODELO */}
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
          <Row class="printerlocation">
            {/* LOCALIZACIÓN DE LA IMPRESORA */}
            <div className="form-group">
                <label htmlFor="printerLocation">Direeción de la impresora</label>
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
          <Row class="printertype">
            {/* TIPO DE LA IMRPESORA */}
          <div className="form-group">
                <label htmlFor="printerType">Tipo de impresora</label>
                <Input
                  type="text"
                  className="form-control"
                  name="printerType"
                  value={printerType}
                  onChange={e => setPrinterType(e.target.value)}
                  validations={[required]}
                />
              </div>
          </Row>
          <Row class="maxunities">
             {/* CANTIDAD */}
             <label htmlFor="maxUnities">Máximas unidades</label>
             <MyValidationInput
                type="number" 
                // max={5000} 
                min="0" 
                value={maxUnities} 
                onChange={e => setMaxUnities(e.target.value)}
                validations={[required]} 
              />
          </Row>
          <Row class="manufacturationspeed">
            {/* VELOCIDAD DE IMRPESIÓN */}

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

          </Row>
          <Row class="material">
            {/* MATERIALES */}
            <div className="form-group">
              <label htmlFor="addres">Materiales</label>
              <Input
                type="text"
                className="form-control"
                name="direccion"
                value={material}
                onChange={e => setMaterial(e.target.value)}
                validations={[required]}
              />
            </div>
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

            <div className="form-group">
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