import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${token}`,
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
    get("api/printers/")
      .then((response) => {
        // if (response.data) {
        //   localStorage.setItem("printers", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        //   console.log(JSON.parse(localStorage.getItem("printers")));
        // }
        return response;
      }); 

}

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### enciar email/ atención al cliente
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const enviarEmail =  (email, asunto ,solicitud, photo) => {
  return app
  .post("api/customerService/sendMail", {
    toUser: [email],
    subject: asunto,
    message: solicitud,
  });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const ImpresorasService = {
  descargarPrinters,
  enviarEmail,
}

export default ImpresorasService;
