import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { Form as BootstrapForm } from 'react-bootstrap';

import { MyValidationCheck } from '../../common/ValidationComponents.js';

import AuthService from "../../services/auth.service";

import { Button, Col, Row } from 'react-bootstrap';


// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
// ####### ####### Validaciones    ####### ####### ####### ####### #######
// ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

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

const validDNI_CIF_NIE = (value) => {
  const dniRegex = /^[0-9]{8}[A-Za-z]$/;
  const cifRegex = /^[A-Za-z][0-9]{7}[A-Za-z0-9]$/;
  const nieRegex = /^[XYZ][0-9]{7}[A-Za-z]$/;

  if (!dniRegex.test(value) && !cifRegex.test(value) && !nieRegex.test(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid DNI, CIF or NIE.
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

const validLatitude = (value) => {
  if (value < -90 || value > 90) {
    return (
      <div className="invalid-feedback d-block">
        Latitude must be between -90 and 90.
      </div>
    );
  }
};

const validLongitude = (value) => {
  if (value < -180 || value > 180) {
    return (
      <div className="invalid-feedback d-block">
        Longitude must be between -180 and 180.
      </div>
    );
  }
};


const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};



const RegisterDisenador = (props) => {

  const form = useRef();
  const checkBtn = useRef();


  const rolesCheckDesigner = useRef("ROLE_DESIGNER");
  const rolesCheckManufacturer = useRef();

  const [dni, setDNI] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [address, setAddress] = useState("");
  const [factAdress, setFactAdress] = useState("");
  const [roles, setRoles] = useState(["ROLE_DESIGNER"]);
  const [iban, setIban] = useState("");


  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");



  const validRoles = (roll) => {
    const uniqueRoles = [rolesCheckManufacturer.current, rolesCheckDesigner.current];
    if (!uniqueRoles.includes("ROLE_MANUFACTURER") && !uniqueRoles.includes("ROLE_DESIGNER")) {
      return (
        <div className="invalid-feedback d-block">
          Debes seleccionar al menos un roll: Diseñador o Fabricante.
        </div>
      );
    }
  };


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // AuthService.register(dni, username, email, password, lat, lon, address, factAdress, roles).then(
      AuthService.register(dni, username, email, password, address, roles, iban).then(
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

  const validIban = (value) => {
    // Aquí puedes agregar la lógica de validación del IBAN
  };


  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div className="text-center">
          <h2>Registrar</h2>
        </div>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username <span style={{ color: 'red' }}>*</span></label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">DNI/CIF/NIE<span style={{ color: 'red' }}>*</span></label>
                <Input
                  type="text"
                  className="form-control"
                  name="dni"
                  value={dni}
                  onChange={e => setDNI(e.target.value)}
                  validations={[required, validDNI_CIF_NIE]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email<span style={{ color: 'red' }}>*</span></label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password<span style={{ color: 'red' }}>*</span></label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              {/*  */}

              {/* <div className="form-group">
                <label htmlFor="Latitud">Lat</label>
                <Input
                  type="number"
                  step="any"
                  className="form-control"
                  name="latitude"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  validations={[validLatitude]}
                />


                <label htmlFor="Longitud">Lon</label>
                <Input
                  type="number"
                  step="any"
                  className="form-control"
                  name="longitude"
                  value={lon}
                  onChange={e => setLon(e.target.value)}
                  validations={[validLongitude]}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="addres">Dirección</label>
                <Input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  validations={[validAddress]}
                />
              </div>
              {/* 
              <div className="form-group">
                <label htmlFor="factaddres">Dirección de facturación</label>
                <Input
                  type="text"
                  className="form-control"
                  name="factaddres"
                  value={factAdress}
                  onChange={e => setFactAdress(e.target.value)}
                  validations={[validAddress]}
                />
              </div> */}


              <BootstrapForm>
                <label>Roles<span style={{ color: 'red' }}>*</span></label>
                {['checkbox'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <BootstrapForm.Check
                      inline
                      label="Diseñador"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      defaultChecked={true}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRoles([...roles, "ROLE_DESIGNER"]);
                          rolesCheckDesigner.current = "ROLE_DESIGNER";
                        } else {
                          setRoles(roles.filter(role => role !== "ROLE_DESIGNER"));
                          rolesCheckDesigner.current = null;
                        }
                      }}
                    />
                    <MyValidationCheck
                      inline
                      label="Fabricante"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRoles([...roles, "ROLE_MANUFACTURER"]);
                          rolesCheckManufacturer.current = "ROLE_MANUFACTURER";
                        } else {
                          setRoles(roles.filter(role => role !== "ROLE_MANUFACTURER"));
                          rolesCheckManufacturer.current = null;
                        }
                      }}
                      validations={[validRoles]}
                    />
                  </div>
                ))}
              </BootstrapForm>
              {roles.includes("ROLE_MANUFACTURER") && (
                <div className="form-group">
                  <label htmlFor="iban">IBAN</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="iban"
                    value={iban}
                    onChange={e => setIban(e.target.value)}
                    validations={[validIban]} // Si has definido la función de validación del IBAN
                  />
                </div>
              )}
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
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

              <Col>

                <Row>
                  <Button href="/login" variant="info" size="sm" >
                    Login
                  </Button>

                </Row>
                <p>

                </p>
                <Row>
                  <Button href="/" variant="danger" size="sm" >
                    Volver
                  </Button>

                </Row>
              </Col>

            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default RegisterDisenador;
