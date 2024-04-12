import React, { useState, useEffect } from "react";
import useLocalStorage from "./common/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Apis
import AuthService from "./services/auth.service";

// Componentes 
import Login from "./components/home/Login";
import Register from "./components/home/Register";
import Profile from "./components/home/Profile";

import ControlPedidos from "./components/disenador/Pedidos/ControlPedidos";
import Carrito from "./components/disenador/Carrito/Carrito";

import Notificaciones from "./components/fabricante/Notificaciones/Notificaciones";
import ImpresorasFabri from "./components/fabricante/Impresoras/TodasImpresoras";
import CrearImpresora from "./components/fabricante/Impresoras/CrearImpresora"; 

import NavBar from "./components/home/NavBar";
import Error from "./components/home/Error";
import FooterSection from "./components/home/FooterSection";
import Location from "./components/home/Location";  
import AtencionCliente from "./components/home/AtencionCliente";

import Home from "./components/home/Home";

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
  const [currentUser, setCurrentUser] = useState(undefined);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Loggin componenetes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      setRoll(user.roles);
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
    setCurrentUser(undefined);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <div className="App">
      <div className="containerr">


      {/* <NavBar roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} currentUser={currentUser} logOut={logOut}/> */}
        <NavBar query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} currentUser={currentUser} logOut={logOut}/>
          
        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} />} />
            <Route exact path={"/home"} element={<Home setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} />} />

            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />

            {/* <Route exact path="/pedidos/*" element={<ControlPedidos />} /> */}
            <Route exact path="/pedidos/*" element={<ControlPedidos />} />
            {/* <Route path="/reseña/:pedidoId" element={<LocationReseña controlPrinters={controlPrinters} roll={roll} query={query} queryUbica={queryUbica} currentUser={currentUser} />}/> */}
            
            <Route exact path="/carritocompra" element={<Carrito />} />
          
            <Route exact path="/notificaciones" element={<Notificaciones />} />
            <Route exact path="/impresorasfabri" element={<ImpresorasFabri />} />
            <Route exact path="/crearimpresora" element={<CrearImpresora />} />

            {/* <Route path="/pedirpedido/:printerId" element={<Location roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} currentUser={currentUser} logOut={logOut}/>}/> */}
            <Route path="/pedirpedido/:printerId" element={<Location controlPrinters={controlPrinters} roll={roll} query={query} queryUbica={queryUbica} currentUser={currentUser} />}/>

            <Route exact path="/atencionCliente" element={<AtencionCliente />} />

            <Route path="/*" element={<Error/>}/>
          
          </Routes>
        </div>

        {/* <footer> */}
        {/* </footer> */}

        {/* <AuthVerify logOut={logOut}/> */}
        </div>  
          <FooterSection/>
    </div>
  );
};

export default App;
