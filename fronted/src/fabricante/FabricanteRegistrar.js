import "../ColoresDiseno.css";
import "./FabricanteLogin.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function DisenadorRegistrar(props) {

    return (
        <div>
            <div className="Registrar coloFabricante">
                <h2 >Registrar Fabricante</h2> 
                
            </div>
            <div>
                <Link to="/loginFabricante"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


