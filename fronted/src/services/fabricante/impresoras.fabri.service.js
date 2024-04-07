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

const createPrinter = (modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material) => {
  // console.log(JSON.parse(localStorage.getItem("user")))
  return app.
    post("api/printers", {
    modelName, 
    printerLocation, 
    printerType, 
    printerPhoto, 
    servicePrice, 
    maxUnities, 
    manufacturationSpeed, 
    material
  });
};

const getImpresorasFabricante = () => {
  return app.
    get("/api/manufacturerPrinters")
    .then((response) => {

      if (response.data.Printers) {
        localStorage.setItem("printersFabricante", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        console.log(JSON.parse(localStorage.getItem("printers")));
      }
      return response.Printers;
    }); 

}

const ImpresorasServiceFabri = {
  createPrinter,
  getImpresorasFabricante,
}


export default ImpresorasServiceFabri;
