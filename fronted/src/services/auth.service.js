import axios from "axios";

import CryptoJS from "crypto-js";


// const API_URL = "http://localhost:8080/";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});

// Decoder method
function decodeToken(token) {
  // Importa la biblioteca CryptoJS
  // const CryptoJS = require("crypto-js");

  // Decodifica el token
  const decodedToken = CryptoJS.HmacSHA384(token, "secret").toJson();
  console.log(decodedToken);

  // Devuelve el token decodificado
  return decodedToken;
}


const register = (dni, username, email, password, lat, lon, address, factAdress, roles) => {

// const register = (dni,username, email, password, address, roles) => {
  return app.post( "api/auth/createUser", {
    dni,
    username,
    email,
    password,
    lat,
    lon,
    address,
    factAdress,
    roles,
  });
};


const login = (username, password) => {
  return app
    .post("login", {
      username,
      password,
    })
    .then((response) => {
      // if (response.data.username) {
      if (response.data.Username) {
        localStorage.setItem("user", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        console.log(JSON.parse(localStorage.getItem("user")));
      }
      const decode = decodeToken(JSON.parse(localStorage.getItem("user")));

      console.log(decode);
      console.log(decode.Username);
      console.log(decode.Roles);


      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return app.post("signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
