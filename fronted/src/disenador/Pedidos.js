
import "../ColoresDiseno.css";
import "./DisenadorLogin.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function Pedidos(props) {

    return (
        <div>
            <div>
                <h2 id="peidods">Pedidos</h2> 
                
            </div>
            <div>
                <h2 id="info">Ruta no encontrada</h2>
                <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}

// import { Navigate, useLocation } from 'react-router-dom';

// function Pedidos(props) {
// // function ProtectedRoute({ element, roles, ...rest }) {
//   roles = ["Diseañdor", "Fabricante"];
//     const location = useLocation();
//   const userRole = "Diseañdor";

//   if (!roles.includes(userRole)) {
//     return <Navigate to="/error" state={{ from: location }} />;
//   }

//   return <div><p>hola</p></div>;
// //   return <Route {...rest} element={element} />;
// }


// Es paa que solo se pueda acceder a esta pagina si eres un rol valido

// import { Route, Navigate, useLocation } from 'react-router-dom';

// function Pedidos(props) {
//     const roles = ["Diseañdor", "Fabricante"];
//     const location = useLocation();
//     const userRole = "Diseañdor"; // Deberías obtener esto de alguna parte de tu aplicación

//     if (!roles.includes(userRole)) {
//         return <Navigate to="/error" state={{ from: location }} />;
//     }

//     return <Route {...props}><div><p>hola</p></div></Route>;
// }




