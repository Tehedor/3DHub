import React, { useState, useEffect } from "react";
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


import NavBar from "./components/home/NavBar";
import Error from "./components/home/Error";
import FooterSection from "./components/home/FooterSection";

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
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/loginDisenador" element={<LoginDisenador />} />
          <Route exact path="/registerDisenador" element={<RegisterDisenador />} />
          <Route exact path="/profileDisenador" element={<ProfileDisenador />} />

          <Route exact path="/loginFabricante" element={<LoginFabricante />} />
          <Route exact path="/registerFabricante" element={<RegisterFabricante />} />
          <Route exact path="/profileFabricante" element={<ProfileFabricante />} />
        
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
