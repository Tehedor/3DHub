import "../ColoresDiseno.css";
import "./FabricanteLogin.css";


import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function FabricanteLogin(props) {

    return (
        <div>
            <div className="login  colorFabricante">
                <h2 id="catálogo">Login del Fabricante</h2> 
                <div id="colores">
                </div>
            </div>
            <div>
                <Link to="/registrarFabricante"><Button id="volver" variant="primary" >Registrarse como fabricante</Button></Link>
                <Link to="/"><Button id="volver" variant="primary" onClick={props.setRoll("fabricante")}> Login</Button></Link>
            </div>
            <div>
                <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}
