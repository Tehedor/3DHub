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

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a PAY
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const revisado = (id) => {
  return app
  .post(`api/orders/${id}/status`, {
    "name": "PAY"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a DELIVERED
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const confirmarEntrga = (id) => {
  return app
  .post(`api/orders/${id}/status`, {
    "name": "DELIVERED"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get ordenes
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidos = () => {
  return app
  .get(`api/orders`)
}


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post añadir pedido
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const añadirPedido = (file, cantidad, fechaFabricacion, fechaEntrega, especificaciones, printer) => {
  const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
  const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
  const stringsprinter = String(printer);
  return app
  .post(`api/orders/create/${printer}`, {
    manufacturerdate: fechaFabricacionFormated,
    pickupdate: fechaEntregaFormated,
    number : cantidad,
    specs : especificaciones,
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post añadir reseña
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const añadirReseña = (productRating, manufacturerRating, textRating, file) => {
  const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
  const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
  const stringsprinter = String(printer);
  return app
  .post(`api/orders/create/${printer}`, {
    date: "07/02/2024",
    productRating: productRating,
    manufacturerRating: manufacturerRating,
    textRating: textRating,
    file: null
  })
}


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Recivir pedidos carrito
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidosCarrito = () => {
  return app
  .get("api/orders/designer", {
  })
  .then((response) => {
    // if (response) {
      //   localStorage.setItem("orderDesigner", JSON.stringify(response)); 
      //   console.log(JSON.parse(localStorage.getItem("orderDesigner"))); 
      // }
      return response;
    });
  };
  
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resuemn
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const PedidosService = {
  revisado,
  confirmarEntrga,
  añadirPedido,
  getPedidosCarrito,
  añadirReseña,
}

export default PedidosService;
