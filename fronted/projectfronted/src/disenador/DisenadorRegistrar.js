import "../ColoresDiseno.css";
import "./DisenadorLogin.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function DisenadorRegistrar(props) {

    return (
        <div>
            <div className="Registrar coloDisenador">
                <h2 id="Registrar de Diseñador">Colores</h2> 
                
            </div>
            <div>
                <h2 id="info">Ruta no encontrada</h2>
                <Link to="/loginDisenador"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


