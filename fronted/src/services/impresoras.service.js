import axios from "axios";



const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${token}`,
  },
});

// const API_URL = "https://dummyjson.com/products";

// const descargar = async (queryparams) => {
//   const data =  await app.get(`${API_URL}${queryparams}`);
//   // console.log(data);   
//   return data;
// };

const descargarPrinters = async (queryparams) => {
  const data =  await app.
    get("/api/printers")
    .then((response) => {

      if (response.data.Printers) {
        localStorage.setItem("printers", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        console.log(JSON.parse(localStorage.getItem("printers")));
      }
      return response.Printers;
    }); 
  // console.log(data);   
  // return data;
};

// const enviarEmail = async (correo, subject, message) => {
const enviarEmail =  (email, asunto ,solicitud, photo) => {
  console.log(email, asunto, solicitud, photo);
  return app
  .post("api/customerService/sendMail", {
    toUser: [email],
    subject: asunto,
    message: solicitud,
  });
};

const ImpresorasService = {
  descargarPrinters,
  enviarEmail,
}

export default ImpresorasService;
