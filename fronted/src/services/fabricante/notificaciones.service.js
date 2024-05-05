import axios from "axios";
import { saveAs } from 'file-saver';

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
// const downloadFile = (id) => {
//   console.log(id);
//   return app
//   .get(`orders/${id}/file`)
//   .then((response) => {
//     console.log(response);
//     return response;
//   });
// }
// const downloadFile = (id) => {
//   console.log(id);
//   return app
//     .get(`orders/${id}/file`, { responseType: 'blob' }) // Asegúrate de que la respuesta sea un Blob
//     .then((response) => {


//       // const blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
//       // saveAs(blob, "hello world.txt");
//       // console.log(response);
//       const blob = new Blob([response.data], { type: response.data.type }); // Crea un Blob a partir de la respuesta
//       console.log(blob);
//       console.log(response.data.type );
//       // const url = window.URL.createObjectURL(blob);
//       // saveAs(url, 'filename.stl'); // Reemplaza 'filename.ext' con el nombre de archivo que desees
//       saveAs(blob); // Reemplaza 'filename.ext' con el nombre de archivo que desees
//       // return response;
//     });
// }

const downloadFile = (id) => {
  console.log(id);
  return app
    .get(`orders/${id}/file`, { responseType: 'blob' }) // Asegúrate de que la respuesta sea un Blob
    .then((response) => {
      const blob = new Blob([response.data], { type: response.data.type }); // Crea un Blob a partir de la respuesta //(model/stl)
      console.log(blob);
      console.log(response.data.type );
      saveAs(blob, 'filename.stl'); // Reemplaza 'filename.stl' con el nombre de archivo que desees
    });
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
