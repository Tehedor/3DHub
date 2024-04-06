import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (username, email, password) => {
  return axios.post(API_URL + "createUser", {
    username,
    email,
    password,
    roles: ["ROLE_DESIGNER"],
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "loginDesigner", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
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
