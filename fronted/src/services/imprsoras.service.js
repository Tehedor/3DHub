import axios from "axios";

const API_URL = "https://dummyjson.com/products";

const descargar = async (queryparams) => {
  const data =  await axios.get(`${API_URL}${queryparams}`);
  // console.log(data);   
  return data;
};


const ImpresorasService = {
  descargar,
}

export default ImpresorasService;
