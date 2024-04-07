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

const getPedidos = () => {
  return app
    .get(`api/orders`)
}


const añadirPedido = (file, cantidad, fechaFabricacion, fechaEntrega, especificaciones, printer) => {

  // const fechaFabricacionFormated = new Date(fechaFabricacion);
  const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
  // console.log(fechaFabricacionFormated);
  const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
  // console.log(fechaEntregaFormated);
  return app
    .post(`api/orders/create/${printer}`, {
      manufacturerdate: fechaFabricacionFormated,
      pickupdate: fechaEntregaFormated,
      number : cantidad,
      specs :especificaciones,
      // "name": "KART"
  })

}
  
  // "manufacturerdate": "2022-11-15",
  // "pickupdate":"2023-10-14",
  // "number": 3,
  // "specs": "Debe de tener cosas"

const PedidosService = {
  revisado,
  confirmarEntrga,
  añadirPedido,
}

export default PedidosService;
