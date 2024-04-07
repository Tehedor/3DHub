import axios from "axios";

const API_URL = "http://localhost:8080/";

const user = JSON.parse(localStorage.getItem("user"));

const token = user ? user.accessToken : "";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

const createPrinter = (modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material) => {
  // console.log(JSON.parse(localStorage.getItem("user")))
  return app.post("api/printers", {
    modelName, 
    printerLocation, 
    printerType, 
    printerPhoto, 
    servicePrice, 
    maxUnities, 
    manufacturationSpeed, 
    material
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
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

const AuthService = {
  createPrinter,
  // login,
  // logout,
  // getCurrentUser,
}

export default AuthService;
