import axios from "axios";
// import filepruebas from "/home/sergio/Desktop/3DHub/fronted/src/constants/frog_Head.stl";
// import fs from 'fs';
// const fileBuffer = fs.readFileSync('/home/sergio/Desktop/3DHub/fronted/src/constants/frog_Head.stl');


const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : "";

// const filepruebas = /home/sergio/Desktop/3DHub/archivosPruebas/frog_Head.stl;

const app = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

const appform = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  },
});
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a PAY
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const revisado = (id) => {
  return app
    .put(`orders/${id}/status`, {
      "name": "PAY"
    })
}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post cambiar estado a DELIVERED
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const confirmarEntrga = (id) => {
  console.log(id);
  return app
    .put(`orders/${id}/status`, {
      // .post(`orders/${id}/status`, {
      "name": "DELIVERED"
    })
}


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post añadir pedido
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const añadirPedido = (file, cantidad, fechaFabricacion, fechaEntrega, especificaciones, printer, address) => {
  const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
  console.log(file);
  // console.log(filepruebas);
  // console.log(fileBuffer);
  console.log(fechaFabricacionFormated);
  const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
  console.log(fechaEntregaFormated);

  const data = {
    manufacturerDate: fechaFabricacionFormated,
    deliveryDate: fechaEntregaFormated,
    quantity: cantidad,
    specs: especificaciones,
    printer_id: printer,
    address: address
  };
  console.log(data);

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', file);

  return appform
    .post(`orders`, formData)
    .then((response) => {
      console.log(response);
      return response;
    });

}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post añadir reseña
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// const añadirReseña = (productRating, manufacturerRating, textRating, file, order_id) => {
//   // const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
//   // const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
//   // const stringsprinter = String(printer);
// //   const printer = "1";

//   const date = new Date().toISOString().split('T')[0];
//   return app
//   .post(`ratings`, {  
//     date: date,
//     productRating: productRating,
//     manufacturerRating: manufacturerRating,
//     textRating: textRating,
//     file: null,
//     order_id:order_id
//   })
// }
const añadirReseña = (valorProducto, valorFabricante, reseñaTexto, foto, order_id) => {
  // const fechaFabricacionFormated = new Date(fechaFabricacion).toISOString().split('T')[0];
  // const fechaEntregaFormated = new Date(fechaEntrega).toISOString().split('T')[0];
  // const stringsprinter = String(printer);
  //   const printer = "1";


  const data = {
    manufacturerRating: valorFabricante,
    productRating: valorProducto,
    textRating: reseñaTexto,
    order_id: order_id
  };
  console.log(data);

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', foto);

  return appform
    .post(` ratings`, formData)
    .then((response) => {
      console.log(response);
      return response;
    });

}


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Recivir pedidos diseñador
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidos = () => {
  return app
    .get("orders/designer", {
    })
    .then((response) => {
      // if (response) {
      //   localStorage.setItem("orderDesigner", JSON.stringify(response)); 
      //   console.log(JSON.parse(localStorage.getItem("orderDesigner"))); 
      // }
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




// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resuemn
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const PedidosService = {
  revisado,
  confirmarEntrga,
  añadirPedido,
  getPedidos,
  añadirReseña,
  deletePedido,
}

export default PedidosService;
