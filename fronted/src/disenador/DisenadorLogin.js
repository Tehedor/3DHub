import "../ColoresDiseno.css";
import "./DisenadorLogin.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function DisenadorLogin(props) {

    return (
        <div>
            <div className="login coloDisenador">
                <h2 id="catálogo">Login del Diseñador</h2> 
                <div id="colores">
                </div>
            </div>
            <div>
                <Link to="/registrarDisenador"><Button id="volver" variant="primary" >Registrarse como fabricante</Button></Link>
                <Link to="/"><Button id="volver" variant="primary" onClick={props.setRoll("diseñador")}> Login</Button></Link>
            </div>
            <div>
                <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


