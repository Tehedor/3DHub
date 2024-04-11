import axios from "axios";

// const API_URL = "http://localhost:3000/api/auth/";

const user = JSON.parse(localStorage.getItem("user"));

const token = user ? user.token : "";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

const noAceptadoRevision = (id) => {
  return app
    .post(`api/orders/${id}/status`, {
      "name": "REVISION"
    })
}

const cancelarPedido = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "CANCELLED"
  })

}

const aceptadoCreando = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "CREATING"
  })

}

const creadoEnviado = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "SEND"
  })

}

const getPedidosFabricante = () => {
  return app
    .get("api/orders/manufacturerOrders", {
      // username,
      // password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("pedidosFabri", JSON.stringify(response)); 
        console.log(JSON.parse(localStorage.getItem("pedidosFabri"))); 
      }
      console.log(response.data);
      return response;
    });
};


const deletePedido = (id) => {
  return app
    .delete(`api/orders/${id}`)
}


// CANCELLED,
// DELIVERED,
// KART,
// PAY,
// REVISION,
// CREATING,
// SEND


const NotificacionService = {
  noAceptadoRevision,
  cancelarPedido,
  aceptadoCreando,
  creadoEnviado,
  getPedidosFabricante,
  deletePedido,
}

export default NotificacionService;
