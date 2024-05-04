import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});


// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post registrar usuario
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// const register = (dni, username, email, password, lat, lon, address, factAdress, roles) => {
const register = (dni, username, email, password,address, roles, iban) => {
  console.log("AuthService.register");
  return app.post("api/auth/createUser", {
    dni: dni,
    username: username,
    email: email,
    password: password,
    iban : roles.includes("ROLE_MANUFACTURER") ? iban : null,
    // lon,
    address: address,
    // factAdress,
    roles: roles,
  });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Post loguear usuario
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const login = async (username, password) => {
  return app
    .post("login", {
      username,
      password,
    })
    .then((response) => {
      // if (response.data.username) {
      if (response.data.Username) {
        localStorage.setItem("user", JSON.stringify(response.data)); // localStorage.setItem("user", JSON.stringify(response.data));: Si la propiedad username existe, entonces se almacena el objeto data de la respuesta en el almacenamiento local del navegador bajo la clave "user". Antes de almacenarlo, el objeto data se convierte en una cadena JSON.
        // localStorage.setItem("token", JSON.stringify(response.data));
        // localStorage.setItem("Username", JSON.stringify(response.data));
        // localStorage.setItem("token", JSON.stringify(response.data));
        console.log(JSON.parse(localStorage.getItem("user")));
      }
      return response.data;
    });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Cerrar sesión
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const logout = () => {
  localStorage.removeItem("user");
  // return app.post("signout").then((response) => {
  //   return response.data;
  // });
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### dar datos del usuario
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getCurrentUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.Username) {
    console.log(user.Username);
    return user.Username;
  } else {
    console.log("User no está definido");
    return "";
  }
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### dar datos del usuario
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const getUserRoles = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.Roles) {
    console.log(user.Roles);
    return user.Roles.map(role => role.authority.replace('ROLE_', ''));
  } else {
    console.log("User o Roles no están definidos");
    return [];
  }
};

// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
// ##### ##### Resumen
// ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserRoles,
}

export default AuthService;
