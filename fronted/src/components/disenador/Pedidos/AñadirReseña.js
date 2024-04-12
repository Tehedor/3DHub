import { useState, useRef } from 'react';
import { Container, Row, Col, Table,Button} from 'react-bootstrap';

// import StarRatings from './react-star-ratings';
import StarRatings from 'react-star-ratings';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {MyValidationInput,  MyValidationButton, MyValidationForm} from '../../../common/ValidationComponents.js';

// import VerPedir from './VerPedir.js';

import PedidosService from "../../../services/diseñador/pedidos.service.js";

function AñadirReseña  (props) {

    
    const numberPedidos=Number(props.pedidosId);
    console.log(numberPedidos);
    // console.log(pedidos);
    const pedidos = props.pedidos[numberPedidos]; 

    const printerId = pedidos.printer_id;

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
    // meter la api
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

  const validEspecificaciones = (value) => {
    if (value.trim().length < 10) {
      return "Las especificaciones deben tener al menos 10 caracteres.";
    }
  };

  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7
  //////////////////////////////////////////////////////7//////////////////////////////////////////////////////7

  const form = useRef();
  const checkBtn = useRef();
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [fechaReseña, setFechaReseña] = useState(today);

  const [valorProducto, setValorProducto] = useState(0);
  const [valorFabricante, setValorFabricante] = useState(0);
  const [reseñaTexto, setReseñaTexto] = useState(null);
  const [foto, setFoto] = useState(null);   
  
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  

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
                <StarRatings
                    rating={valorFabricante}
                    starRatedColor="yellow"
                    changeRating={setValorFabricante}
                    numberOfStars={5}
                    name='ratingFabricante'
                />
            </Row>

           <Row class="subir">          
           {/*  SUBIR FIL */}
           <MyValidationInput
               type="file" 
               formlabel="Subir foto" 
               onChange={(e) => setFoto(e.target.files[0])}
               // validations={[required]} 
               // validations={} 
             />
           </Row>

           <Row>
             {/* RESEÑA TEXTO */}
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
                <Button variant="success" onClick={handleReseña}>Añadir reseña</Button>
                 <p></p>
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