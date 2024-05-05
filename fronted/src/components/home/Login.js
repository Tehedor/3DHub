import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log(username, password);
      // AuthService.login(username, password).then(
      await AuthService.login(username, password).then(
        () => {
          const userRoles = AuthService.getUserRoles();
          // console.log(userRoles);
          if (userRoles.length === 1) {
            // console.log(userRoles[0]);
            props.setTheRollControl((userRoles[0] === "MANUFACTURER") ? "MANUFACTURER" : "DESIGNER");
            props.setCambioRoll((userRoles[0] === "MANUFACTURER") ? "MANUFACTURER" : "DESIGNER");
            // console.log(props.theRollActual);
          }
          // console.log(props.theRollActual);




          // AuthService.getDescargarUsuario().then(
          //   () => {
          //     const userDescargado = JSON.parse(localStorage.getItem("usuarioDescargado"));
          //     console.log(userDescargado);
          //   }
          // );
          // if (JSON.parse(localStorage.getItem("user"))) {

          // }


          navigate("/");
          window.location.reload();
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );



      // console.log(userRoles);
      // console.log(userRoles.length === 1 );
      // console.log(userRoles[0] === "MANUFACTURER");
      // // if (userRoles.length < 2 && userRoles.length > 0) {

      // AuthService.getUserRoles();
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div className="text-center">
          <h2>Login</h2>
        </div>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <p></p>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          <p></p>

          <div className="form-group">
            <Link to="/register">
              <button className="btn btn-secondary btn-block">
                <span>Register</span>
              </button>
            </Link>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {/* {message} */}
                usuario o contraseña incorrectos
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        {/* <Button variant="link" onClick={AuthService.getDescargarUsuario}>Pruebsa</Button> */}
      </div>
    </div>
  );
};

export default Login;
