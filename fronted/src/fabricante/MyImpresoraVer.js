import "../ColoresDiseno.css";

import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function MyImpresorasVer(props) {

    return (
        <div>
            <div>
                <h2 >Mis impresoras ver</h2> 
                
            </div>
            <div>
                <Link to="/myprinters"><Button id="volver" variant="primary" >Volver</Button></Link>
            </div>
        </div>
    );

}


