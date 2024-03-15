import { Card,Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Ver(props) {

    const product = props.theproducts[Number(props.productId)];
    
    return(
        <Card border="dark" style={{ backgroundColor: "#343541"}} > 
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <Card.Img src={product.images[product.images.length - 1]} style={{ maxWidth: "100%" }} />
                </Col>
                <Col >
                    <Card.Body  style={{ color: "#d9d9e3" }}>
                        <Card.Title id="titulo" style={{ color:"white"}}>Nombre: {product.title}</Card.Title>
                        <Card.Text>Descipción: <b>{product.description}</b></Card.Text>
                        <Card.Text>Price: {product.price} $</Card.Text>
                        <Card.Text>Ratign: {product.rating}</Card.Text>
                        <Card.Text>Stock: {product.stock}</Card.Text>

                        <Link to="/"><Button id="volver" className="index">Volver</Button></Link>
                    </Card.Body>
                </Col>
            </Row>
        </Card>  
    );
 
}