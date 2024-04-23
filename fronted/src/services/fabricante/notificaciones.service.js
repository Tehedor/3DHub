import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : "";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a REVISION
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const noAceptadoRevision = (id) => {
  return app
  .post(`api/orders/${id}/status`, {
    "name": "REVISION"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a CANCELLED
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const cancelarPedido = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "CANCELLED"
  })
  
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a CREATING
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const aceptadoCreando = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "CREATING"
  })
  
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a SEND
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const creadoEnviado = (id) => { 
  return app
  .post(`api/orders/${id}/status`, {
    "name": "SEND"
  }) 
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get pedidos del fabricante
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidosFabricante = () => {
  return app
  .get("api/orders/manufacturerOrders", {
  })
  .then((response) => {
    // if (response.data) {
    //   localStorage.setItem("pedidosFabri", JSON.stringify(response)); 
    //   console.log(JSON.parse(localStorage.getItem("pedidosFabri"))); 
    // }
    console.log(response.data);
    return response;
  });
};
  
  
// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### delete Pedido
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const deletePedido = (id) => {
  return app
  .delete(`api/orders/${id}`)
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const NotificacionService = {
  noAceptadoRevision,
  cancelarPedido,
  aceptadoCreando,
  creadoEnviado,
  getPedidosFabricante,
  deletePedido,
}

export default NotificacionService;
