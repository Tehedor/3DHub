import { useState, useRef } from 'react';
import { Container, Row, Col,Button} from 'react-bootstrap';

import StarRatings from 'react-star-ratings';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {MyValidationInput} from '../../../common/ValidationComponents.js';

// Apis
import PedidosService from "../../../services/diseñador/pedidos.service.js";

function AñadirReseña  (props) {

    const numberPedidos = Number(props.pedidosId);
    const pedidos = props.pedidos[numberPedidos]; 
    const printerId = pedidos.printer_id;

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Requisitos
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
  
  const validFile = (value) => {
    // console.console.log("validFile");
    // meter la api
  };

  const validEspecificaciones = (value) => {
    if (value.trim().length < 10) {
      return "Las especificaciones deben tener al menos 10 caracteres.";
    }
  };
  
  
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Variables de control
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const form = useRef();
  const checkBtn = useRef();
  
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Variables de la reseña
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [fechaReseña, setFechaReseña] = useState(today);
  const [valorProducto, setValorProducto] = useState(0);
  const [valorFabricante, setValorFabricante] = useState(0);
  const [reseñaTexto, setReseñaTexto] = useState(null);
  const [foto, setFoto] = useState(null);   
  
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Handle
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const handleReseña = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      PedidosService.a( fechaReseña, valorProducto, valorFabricante, reseñaTexto, foto, printerId).then(
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
    <Form onSubmit={handleReseña} ref={form}>
       
      {!successful && (
        <Row>
          <Col class="central">
            
            <Row>
                <label>Valoración del producto</label>
                {/* ################ */}
                {/* Ratings Producto */}
                {/* ################ */}
                <StarRatings
                    rating={valorProducto}
                    starRatedColor="orange"
                    changeRating={setValorProducto}
                    numberOfStars={5}
                    name='ratingProducto'
                    />
            </Row>
            <Row>
                <label>Valoración del fabricante</label>
                    {/* ################## */}
                    {/* Ratings Fabricante */}
                    {/* ################## */}
                <StarRatings
                    rating={valorFabricante}
                    starRatedColor="yellow"
                    changeRating={setValorFabricante}
                    numberOfStars={5}
                    name='ratingFabricante'
                />
            </Row>

            <Row class="subir">          
                {/*  ######### */}
                {/*  SUBIR FIL */}
                {/*  ######### */}
                <MyValidationInput
                    type="file" 
                    formlabel="Subir foto" 
                    onChange={(e) => setFoto(e.target.files[0])}
                    // validations={[validFile]} 
                  />
            </Row>

            <Row>
              {/* ############ */}
              {/* RESEÑA TEXTO */}
              {/* ############ */}
              <MyValidationInput
                as="textarea"
                formlabel="Reseña"
                rows={7}
                maxLength={400}
                value={reseñaTexto}
                onChange={e => setReseñaTexto(e.target.value)}
                validations={[required,validEspecificaciones]} // Agrega tus validaciones aquí
              />
            </Row>

            <Row>
                <p></p><p></p>
                {/* Button Añadir Reseña */}
                <Button variant="success" onClick={handleReseña}>Añadir reseña</Button>
                <p></p>
                {/* Button Añadir Vovler */}
                <Button href="/pedidos" variant="danger ">Vover</Button>
                <p></p><p></p>
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

export default AñadirReseña;