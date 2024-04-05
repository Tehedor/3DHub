import { useState, useRef } from 'react';
import { Container, Row, Col, Table,Button} from 'react-bootstrap';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import { isEmail } from "validator";


import {MyValidationInput,  MyValidationButton, MyValidationForm} from '../../common/ValidationComponents.js';

import Ver from './VerPedir.js';



export default function AtencionCliente(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
    const [email, setEmail] = useState("");
    const [solicitud, setSolicitud] = useState(null);
    const [photo, setPhoto] = useState(null);

    const required = (value) => {
        if (!value) {
            return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
            );
        }
    };

    const validEmail = (value) => {
        if (!isEmail(value)) {
            return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
            );
        }
    };

    const validSolicitud = (value) => {
        if (value.trim().length < 10) {
          return "Las solicitud deben tener al menos 10 caracteres.";
        }
    };
      
    const validPhoto = (value) => {
        //una foto con dudas
        if(value == "null"){
            return "no hay foto"
        }
    };
      
    const subirSolicitud = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
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
            // console.log("file: ");
        // }
    };

    return (

        <Container>
            <Row>
                <h2 >AtencionCliente</h2>
            </Row>
            <Form onSubmit={subirSolicitud} ref={form}>
            {!successful && (    
                <>
                    <Row>
                

                {/* <label htmlFor="email">Email</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                    /> */}
                    <MyValidationInput
                    type="text"
                    className="form-control"
                    formlabel="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}      
                    validations={[required, validEmail]}
                    /> 
                </Row>
                <Row class="subir">          
                    {/*  SUBIR PHOTO */}
                    {/* <MyValidationInput
                        type="file" 
                        formlabel="Subir Imagen" 
                        onChange={(e) => setPhoto(e.target.files[0])}
                        validations={[validPhoto]} 
                    /> */}
            </Row>
                <Row>

                    <MyValidationInput
                        as="textarea"
                        formlabel="Solicitud"
                        rows={7}
                        maxLength={400}
                        value={solicitud}
                        onChange={e => setSolicitud(e.target.value)}
                        validations={[required,validSolicitud]} // Agrega tus validaciones aquí
                    />
                </Row>
                <Row className="Añadir" style={{display: 'flex', alignItems: 'flex-end'}}>
                <Button variant="success" onClick={subirSolicitud}>Mandar solicitud</Button>
                <p>
                </p>
                <Button href="/" variant="danger">Vover</Button>
            </Row>
            </>
            )}
            </Form> 
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
            {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        
        </Container>
    
    );

}


