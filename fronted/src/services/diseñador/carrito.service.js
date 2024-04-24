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
// ##### ##### Get Carrito
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const getPedidosCarrito = () => {
  return app
  // .get("api/orders/kart", {
    .get("api/orders/designer", {
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
  .post(`api/orders/${id}/status`, {
    "name": "PAY"
  })
}

// ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Delete pedido
// ##### ##### ##### ##### ##### ##### ##### ##### #####
const deletePedido = (id) => {
  return app
  .delete(`api/orders/${id}`)

  console.log(id);
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
