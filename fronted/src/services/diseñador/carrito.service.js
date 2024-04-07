import axios from "axios";

// const API_URL = "http://localhost:8080/";

const user = JSON.parse(localStorage.getItem("user"));

const token = user ? user.accessToken : "";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});


const getPedidsoCarrito = (username, password) => {
  return app
    .get("pedidosCarrit", {
      // username,
      // password,
    })
    .then((response) => {
      if (response.data.carrito) {
        localStorage.setItem("carrito", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
      }

      return response.data.carrito;
    });
};

const order = (id) => {
  return app
    .post(`api/orders/${id}/status`, {
      "name": "PAY"
    })
}



const CarritoService = {
  getPedidsoCarrito,
  order,
}

export default CarritoService;
