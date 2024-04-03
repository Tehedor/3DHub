import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Lista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
        {/* <Container fluid="true"  style={{ display: "flex"}}> */}
        <Container fluid="true"  style={{ marginTop: '10px',display: 'flex', justifyContent: 'center'  }}>
        {/* <Container fluid="true" className="d-flex justify-content-center" style={{ marginTop: '10px',display: 'flex', justifyContent: 'center'  }}> */}
            <Col >
            
                {lista.map((items,index) => (
                    <Col key={items.id} className="cartas" style={{marginBottom: "20px", marginLeft: "30px"}}>
                        <div className="unproducto" >
                        <Card border="dark" style={{ backgroundColor: "#343541", width: '16rem',   height: '400px', borderWidth: "5px" }} > 
                            <Card.Img variant="top" src={items.images[items.images.length - 1]} style={{ height: '150px', objectFit: 'cover'}}/>
                            <Card.Body  style={{ color: "#d9d9e3" }}>
                                <Card.Title style={{ color:"white",overflow: "nowrap" , overflowY:"hidden",maxHeight:"2.3em"}}>{items.title}</Card.Title>
                                <Card.Text style={{ overflow: "nowrap", overflowY:"hidden",maxHeight:"6.7em"}}>{items.description}</Card.Text>     
                            </Card.Body>
                            <div className="actions"  style={{ marginTop: "auto" }}>
                                    <Link to={`/pedirpedido/${index}`}><Button variant="primary" className="show" style={{marginBottom:"10px"}}>ver</Button></Link>
                            </div>
                        </Card>
                        </div>
                    </Col>
                ))}
            </Col>
        </Container>
        </div>);
}
