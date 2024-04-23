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
// ##### ##### Post create printer
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const createPrinter = (modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material, maxWidth,maxHeight, printerPrecision,color) => {
  return app.
  post("api/printers/createPrinter", {
    modelName, 
    printerLocation, 
      printerType, 
      printerPhoto, 
      servicePrice, 
      maxUnities, 
      manufacturationSpeed, 
      material,
      maxWidth,
      maxHeight,
      printerPrecision,
      color
    });
};
  
// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Impresoras fabricante
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getImpresorasFabricante = () => {
  return app.
  get("api/printers/printers")
  .then((response) => {
    
    // if (response.data) {
      //   localStorage.setItem("printersFabri", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
      //   console.log(JSON.parse(localStorage.getItem("printersFabri")));
      // }
      return response;
    }); 
    
}
  
// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Impresoras fabricante
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const deletePrinter = (id) => {
  // console.log("id",id);
  return app.
  delete(`deletePrinter`, 
  {
    id
  }
);
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const ImpresorasServiceFabri = {
  createPrinter,
  getImpresorasFabricante,
  deletePrinter,
}


export default ImpresorasServiceFabri;
