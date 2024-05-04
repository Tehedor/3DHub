import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : "";

const app = axios.create({
  baseURL: "http://localhost:8080/api/",
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
  .put(`orders/${id}/status`, {
    "name": "REVISION"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a CANCELLED
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const cancelarPedido = (id) => { 
  return app
  .put(`orders/${id}/status`, {
    "name": "CANCELLED"
  })
  
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a CREATING
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const aceptadoCreando = (id) => { 
  return app
  .put(`orders/${id}/status`, {
    "name": "CREATING"
  })
  
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a SEND
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const creadoEnviado = (id) => { 
  return app
  .put(`orders/${id}/status`, {
    "name": "SEND"
  }) 
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get pedidos del fabricante
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidosFabricante = () => {
  return app
  .get("orders/manufacturerOrders", {
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
  .delete(`orders/${id}`)
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### downloadFile
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const downloadFile = (id) => {
  console.log(id);
  // return app
  // .get(`orders/fiel/${id}`)
  // .then((response) => {
  //   console.log(response.data);
  //   return response;
  // });
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
  downloadFile
}

export default NotificacionService;
