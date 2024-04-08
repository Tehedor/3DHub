import axios from "axios";

// const API_URL = "http://localhost:8080/";

const user = JSON.parse(localStorage.getItem("user"));

const token = user ? user.token : "";
// const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkaXNlw7FhZG9yIiwiaWF0IjoxNzEyNTMxOTU0LCJleHAiOjE3MTI2MTgzNTR9.Nts95aYoJJ_XufHbAIl9SkGz9Mk5W4ac6JRic2yqsrLfvyVRoLfJDrLochpPip76";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});



const getPedidosCarrito = () => {
  return app
    .get("api/orders/kart", {
      // username,
      // password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("carrito", JSON.stringify(response)); 
        console.log(JSON.parse(localStorage.getItem("carrito"))); 
      }
      console.log(response.data);
      return response;
    });
};

const order = (id) => {
  console.log("id",id);
  return app
    .post(`api/orders/${id}/status`, {
    // .post(`api/orders/${id}/status`, {
      "name": "PAY"
    })
}

const deletePedido = (id) => {
  return app
    .delete(`api/orders/${id}`)
}


const CarritoService = {
  getPedidosCarrito,
  order,
  deletePedido,
}

export default CarritoService;
