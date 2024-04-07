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

const revisado = (id) => {
  return app
    .post(`api/orders/${id}/status`, {
      "name": "PAY"
    })
}

const confirmarEntrga = (id) => {
  return app
    .post(`api/orders/${id}/status`, {
      "name": "DELIVERED"
    })
}


const PedidosService = {
  revisado,
  confirmarEntrga,
}

export default PedidosService;
