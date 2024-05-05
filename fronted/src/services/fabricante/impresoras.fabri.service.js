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

const appform = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  },
});

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post create printer
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const createPrinter = (modelName, printerLocation, printerType, printerPhoto, servicePrice, maxUnities, manufacturationSpeed, material, maxWidth, maxHeight, printerPrecision, color) => {


  const data = {
    modelName: modelName,
    printerLocation: printerLocation,
    printerType: printerType,
    servicePrice: servicePrice,
    maxUnities: maxUnities,
    manufacturationSpeed: manufacturationSpeed,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    printerPrecision: printerPrecision,
    color: color,
    material: material,
    idFabricante: 123
  };
  console.log(data);

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', printerPhoto);

  return appform
    .post(`printers`, formData)
    .then((response) => {
      console.log(response);
      return response;
    });



};
// {"modelName": "Ender 3","printerLocation": "Oficina","printerType": "FDM","servicePrice": 10.5,"maxUnities": 5,"manufacturationSpeed": "Rápida","maxWidth": 220.0,"maxHeight": 250.0,"printerPrecision": 0.1,"color": "BLACK","material": "PLASTIC","idFabricante": 123}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Impresoras fabricante
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getImpresorasFabricante = () => {
  return app.
    get("printers/manufacturer")
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
  console.log("id", id);
  const idString = id.toString();
  return app.
    delete(`printers/${idString}`,
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
