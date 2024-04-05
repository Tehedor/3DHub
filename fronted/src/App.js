import React, { useState, useEffect } from "react";
import useLocalStorage from "./common/useLocalStorage";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/diseñador/auth.service";

import LoginDisenador from "./components/disenador/LoginDisenador";
import RegisterDisenador from "./components/disenador/RegisterDisenador";
import ProfileDisenador from "./components/disenador/ProfileDisenador";

import LoginFabricante from "./components/fabricante/LoginFabricante";
import RegisterFabricante from "./components/fabricante/RegisterFabricante";
import ProfileFabricante from "./components/fabricante/ProfileFabricante";

import Pedidos from "./components/disenador/Pedidos";
import Carrito from "./components/disenador/Carrito";

import Notificaciones from "./components/fabricante/Notificaciones";
import ImpresorasFabri from "./components/fabricante/ImpresorasFabri";

import NavBar from "./components/home/NavBar";
import Error from "./components/home/Error";
import FooterSection from "./components/home/FooterSection";
import Location from "./components/home/Location";  
import PedirPedido from "./components/home/PedirPedido";
import AtencionCliente from "./components/home/AtencionCliente";

// import Home from "./components/Home";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import Home from "./components/home/Home";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";


const App = () => {

  // Vairable busqueda /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [query, setQuery] = useState("");
  const [queryUbica, setQueryUbica] = useState("");
  const [roll, setRoll] = useState();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  // const [controlPrinters, setControlPrinters] = useState(""); 
  const [controlPrinters, setControlPrinters] = useLocalStorage('printers',[]); 


  // Loggin Variables /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Loggin componenetes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      setRoll(user.roles);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    
    EventBus.on("logout", () => {
      logOut();
    });
    
    return () => {
      EventBus.remove("logout");
    };
  }, []);
  
  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    // setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <div>

      <NavBar roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} currentUser={currentUser} logOut={logOut}/>
        
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} />} />
          <Route exact path={"/home"} element={<Home setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} />} />

          <Route exact path="/loginDisenador" element={<LoginDisenador />} />
          <Route exact path="/registerDisenador" element={<RegisterDisenador />} />
          <Route exact path="/profileDisenador" element={<ProfileDisenador />} />

          <Route exact path="/loginFabricante" element={<LoginFabricante />} />
          <Route exact path="/registerFabricante" element={<RegisterFabricante />} />
          <Route exact path="/profileFabricante" element={<ProfileFabricante />} />

          <Route exact path="/pedidos" element={<Pedidos />} />
          <Route exact path="/carritocompra" element={<Carrito />} />
        
          <Route exact path="/notificaciones" element={<Notificaciones />} />
          <Route exact path="/impresorasfabri" element={<ImpresorasFabri />} />
          {/* <Route path="/pedirpedido/:printerId" element={<Location roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} currentUser={currentUser} logOut={logOut}/>}/> */}
          <Route path="/pedirpedido/:printerId" element={<Location controlPrinters={controlPrinters} roll={roll} query={query} queryUbica={queryUbica} currentUser={currentUser} />}/>

          <Route exact path="/atencionCliente" element={<AtencionCliente />} />

          <Route path="/*" element={<Error/>}/>
        
        </Routes>
      </div>

      <footer>
        <FooterSection/>
      </footer>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
