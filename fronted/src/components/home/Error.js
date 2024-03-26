import { Card, Button , Routes, Route,Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Ver(props) {
    
    return(
    <Row>
        <Col>
        <img id="loading" src={process.env.PUBLIC_URL + "/spinners/patitoevil.gif"} className="patitoevil" alt="patitoevil" />
        </Col>
        <Col>
            
        <div>
            <h2 id="info">Ruta no encontrada</h2>
            <Link to="/"><Button id="volver" variant="primary" >Volver</Button></Link>
        </div>
        </Col>
        <Col>
            <img id="loading" src={process.env.PUBLIC_URL + "/spinners/patitoevil.gif"} className="patitoevil" alt="patitoevil" />
        </Col>
    </Row>
    );

}