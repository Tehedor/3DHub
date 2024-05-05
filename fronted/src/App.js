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
import PasarelaPago from "./components/disenador/Carrito/PasarelaPago";

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

// import AuthService from "./services/auth.service.js";

const App = () => {

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Variables de busqueda
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const [query, setQuery] = useState("");
  const [queryUbica, setQueryUbica] = useState("");
  const [roll, setRoll] = useState();

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de impresoras
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const [controlPrinters, setControlPrinters] = useLocalStorage('printers',[]); 
  const [controlRatings, setControlRatings] = useLocalStorage('ratings',[]);
  const [controlFabricantes, setControlFabricantes] = useLocalStorage('fabricantes',[]);

  const [theprinters, setThePrinters] = useState([]);
  const [theratings, setTheRatings] = useState();
  const [theFabricantes, setTheFabricantes] = useState();
  

  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de filtros
  // ##### ##### ##### ##### ##### ##### ##### #####
  const [theFiltrarOn, setTheFiltrarOn] = useState(false);

  const [printerType, setPrinterType] = useState('');
  const [maxUnities, setMaxUnities] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');

  // theFiltrarOn={theFiltrarOn} setTheFiltrarOn={setTheFiltrarOn}

  // const descargar = AuthService.getDescargarUsuario();
  // console.log(descargar);

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de roles
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const rolesUser = AuthService.getUserRoles();
  const getInitialRole = () => {
    const storedRole = localStorage.getItem("theRollActual");
    // const storedRole = localStorage.getItem("theRollActual");
    const validRoles = ["DESIGNER", "MANUFACTURER"];
    console.log(storedRole);
    console.log(validRoles.includes(storedRole) ? storedRole : "DESIGNER");
    return validRoles.includes(storedRole) ? storedRole : "DESIGNER";
  }

  // const [theRollActual, setTheRollControl] = useLocalStorage('theRollActual',"DESIGNER");
  const [theRollActual, setTheRollControl] = useLocalStorage('theRollActual', getInitialRole());
  const [cambioRoll, setCambioRoll] = useState(theRollActual);

  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de Login
  // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  const [currentUser, setCurrentUser] = useState(undefined);

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
    setCambioRoll("DESIGNER");
    setTheRollControl("DESIGNER");
    AuthService.logout();
    setCurrentUser(undefined);
  };

  // ##### ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Return
  // ##### ##### ##### ##### ##### ##### ##### ##### #####
  return (
    <div className="App" style={{ backgroundColor: cambioRoll === "DESIGNER" ? "white" : cambioRoll === "MANUFACTURER" ? "#fcebdc" : "default" }}>
      <div className="containerr">

        <NavBar 
          query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica} 
          currentUser={currentUser} cambioRoll={cambioRoll} setCambioRoll={setCambioRoll} theRollActual={theRollActual} setTheRollControl={setTheRollControl} logOut={logOut} 
          theprinters={theprinters} setThePrinters={setThePrinters} theratings={theratings} setTheRatings={setTheRatings} theFabricantes={theFabricantes} setTheFabricantes={setTheFabricantes}
          setTheFiltrarOn={setTheFiltrarOn} printerType={printerType} maxUnities={maxUnities} material={material} color={color}
          setPrinterType={setPrinterType} setMaxUnities={setMaxUnities} setMaterial={setMaterial} setColor={setColor}
        />

        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home
              theFiltrarOn={theFiltrarOn} printerType={printerType} maxUnities={maxUnities} material={material} color={color}
              setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} setControlRatings={setControlRatings} controlRatings={controlRatings} setControlFabricantes={setControlFabricantes}
              theprinters={theprinters} setThePrinters={setThePrinters} theratings={theratings} setTheRatings={setTheRatings} theFabricantes={theFabricantes} setTheFabricantes={setTheFabricantes}
            />}
            />
            <Route exact path={"/pedirpedido"} element={<Home
              theFiltrarOn={theFiltrarOn} printerType={printerType} maxUnities={maxUnities} material={material} color={color}
              setControlPrinters={setControlPrinters} controlPrinters={controlPrinters} setControlRatings={setControlRatings} controlRatings={controlRatings} setControlFabricantes={setControlFabricantes}
              theprinters={theprinters} setThePrinters={setThePrinters} theratings={theratings} setTheRatings={setTheRatings} theFabricantes={theFabricantes} setTheFabricantes={setTheFabricantes}
            />} />
            <Route exact path="/login" element={<Login
              setTheRollControl={setTheRollControl} theRollActual={theRollActual} setCambioRoll={setCambioRoll}
            />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />

            <Route exact path="/pedidos/*" element={<ControlPedidos />} />

            <Route exact path="/carritocompra" element={<Carrito />} />
            <Route exact path="/carritocompra/pasarelapago" element={<PasarelaPago />} />

            <Route exact path="/notificaciones" element={<Notificaciones />} />
            <Route exact path="/impresorasfabri" element={<ImpresorasFabri />} />
            <Route exact path="/crearimpresora" element={<CrearImpresora />} />

            {/* <Route path="/pedirpedido/:printerId" element={<Location */}
            <Route path="/pedirpedido/:printerId" element={<Location
              controlPrinters={controlPrinters} roll={roll} query={query} queryUbica={queryUbica} currentUser={currentUser} controlRatings={controlRatings} cambioRoll={cambioRoll} controlFabricantes={controlFabricantes}
              // theprinters={theprinters} setThePrinters={setThePrinters} theratings={theratings} setTheRatings={setTheRatings} theFabricantes={theFabricantes} setTheFabricantes={setTheFabricantes}
            />} />

            <Route exact path="/atencionCliente" element={<AtencionCliente />} />

            <Route path="/*" element={<Error />} />

          </Routes>
        </div>

        {/* <footer> */}
        {/* </footer> */}

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
      <FooterSection cambioRoll={cambioRoll} />
    </div>
  );
};

export default App;
