import axios from "axios";

// const API_URL = "http://localhost:8080/";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
  // withCredentials: true,
});


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
      // username : "claudia",
      // password : "3333",
    })
    .then((response) => {
      // if (response.data.username) {
      if (response.data.Username) {
        localStorage.setItem("token", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        console.log(token,JSON.parse(localStorage.getItem("token")));
      }

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

const order = () => {
  return axios
    .post(API_URL + "order", {
      headers: {
        Authorization: `Bearer ${getCurrentUser().token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  order,
}

export default AuthService;
