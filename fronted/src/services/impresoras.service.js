import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${token}`,
  },
});


const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : "";
// const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJmYWJyaWNhbnRlIiwiaWF0IjoxNzE0OTA4NzAzLCJleHAiOjE3MTQ5OTUxMDN9.RghMERXYkQ6Xay-X1zek5ebNQfmeZWIFDQ7_444bZZkbDwnsBALlZlaiXz4-LHd5";

const appVerifi = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});


// const descargarPrinters = () => {
//   return  app.
//     get("api/printers")
//     .then((response) => {

//       if (response.data) {
//         // localStorage.setItem("printers", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
//         // console.log(JSON.parse(localStorage.getItem("printers")));
//       }
//       console.log(response);
//       return response;

//     }); 
//   // console.log(data);   
//   // return data;
// };


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### descagar impresoras/vista general
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const descargarPrinters = () => {
  return app.
    get("printers")
    .then((response) => {
      // if (response.data) {
      //   localStorage.setItem("printers", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
      //   console.log(JSON.parse(localStorage.getItem("printers")));d
      // }
      return response;
    });

}

const descargarPrintersFiltred = (printerType, maxUnities, material, color) => {
  let url = 'printers/filter?';

  if (printerType) {
    url += `printerType=${printerType}&`;
  }
  if (maxUnities) {
    url += `maxUnities=${maxUnities}&`;
  }
  if (material) {
    url += `material=${material}&`;
  }
  if (color) {
    url += `color=${color}&`;
  }

  // Remove the trailing '&' or '?' if no parameters were added
  url = url.endsWith('&') ? url.slice(0, -1) : url;
  url = url.endsWith('?') ? url.slice(0, -1) : url;

  return app.get(url)
    .then((response) => {
      return response;
    });
}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### enciar email/ atención al cliente
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const enviarEmail = (email, asunto, solicitud) => {
  return app
    .post("customerService/sendMail", {
      toUser: [email],
      subject: asunto,
      message: solicitud,
    });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Mandar Filtro
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const mandarFiltro = (printerType, maxUnities, material, color) => {
  // return app
  // .post("printers/filtrar", {
  //   printerType,
  //   maxUnities,
  //   material,
  //   color,
  // });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### dar datos del usuario online
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getDescargarUsuario = async () => {
  console.log("AuthService.getDescargarUsuario");
  return appVerifi.
    get("users")
    .then((response) => {
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("usuarioDescargado", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
      }
      console.log(JSON.parse(localStorage.getItem("usuarioDescargado")));
      // return response.data;

    });
}





// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const ImpresorasService = {
  descargarPrinters,
  descargarPrintersFiltred,
  enviarEmail,
  mandarFiltro,
  getDescargarUsuario,
}

export default ImpresorasService;
