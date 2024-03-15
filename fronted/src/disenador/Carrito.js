import "../ColoresDiseno.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Carrito(props) {

    return (
        <div>
            <div>
                <h2 >Carrito</h2> 
                
            </div>
            <div>
                <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


