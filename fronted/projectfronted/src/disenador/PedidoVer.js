import "../ColoresDiseno.css";
import "./DisenadorLogin.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function PedidosVer(props) {

    return (
        <div>
            <div >
                <h2 id="Pedidos Ver">PedidosVer</h2> 
                
            </div>
            <div>
                <h2 id="info">Ruta no encontrada</h2>
                <Link to="/pedidos"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


