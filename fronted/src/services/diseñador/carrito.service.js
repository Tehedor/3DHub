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

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Get Carrito
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidosCarrito = async () => {
  return app
  .get("orders/kart", {
    // .get("orders/designer", {
    })
    .then((response) => {
      // if (response.data) {
        //   localStorage.setItem("carrito", JSON.stringify(response)); 
        //   console.log(JSON.parse(localStorage.getItem("carrito"))); 
        // }
        return response;
      });
  };
    
// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post order
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const order = (id) => {
  return app
  .put(`orders/${id}/status`, {
    "name": "PAY"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Delete pedido
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const deletePedido = (id) => {
  return app
  .delete(`orders/${id}`)
}


// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const CarritoService = {
  getPedidosCarrito,
  order,
  deletePedido,
}

export default CarritoService;
