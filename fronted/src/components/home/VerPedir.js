import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";

import StarRatings from 'react-star-ratings';

export default function Ver(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const printer = props.printer;
    const printerId = props.printer.id;
    
    // Api change
    const ratingProducto = 3.5;
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
            <Card.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Row>
                    <Col md={6} lg={3} class="imagen" className="d-flex justify-content-center align-items-center">
                    <Container style={{ width: "100%", height: "auto", overflow: "hidden", boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)" }}>
                        <Image
                        src={printer.printerPhoto || "http://localhost:3000/printer_default.jpg"}
                        style={{ width: "100%", objectFit: "cover" }}
                        thumbnail
                        />
                    </Container>
                    </Col>
                    <Col md={6} lg={9} class="datos_impresora">
                        <Row style={{backgroundColor: "gray"}}>
                       <Col sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Card.Text style={{color: 'black'}}>Nombre: {printer.modelName}</Card.Text>
                        </Col>
                            <Col sm={4}>
                                <Row noGutters>
                                    <Container>
                                    <StarRatings
                                        // rating={props.ratingProducto}
                                        rating={ratingProducto}
                                        starRatedColor="orange"
                                        numberOfStars={5}
                                        name='ratingProducto'
                                        starDimension="20px"
                                        starSpacing="0px"
                                        
                                    />
                                    </Container>
                                </Row>
                                
                            </Col>
                            <Col sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Card.Text>Fabricante: <strong>{printer.userIdFabricante}</strong>, Id_imprsora: {printer.id}</Card.Text>
                            </Col>
                            

                        </Row>
                        <Row style={{marginTop: "10px"}}>
                            <Col sm={6}>
                                <Card.Text>Tipo: {printer.printerType}</Card.Text>
                                <Card.Text>Max_unid: {printer.maxUnities}</Card.Text>
                                <Card.Text>Velocidad: {printer.manufacturationSpeed}</Card.Text>
                                <Card.Text>Max_ancho: {printer.maxWidth}</Card.Text>
                                <Card.Text>Max_alto: {printer.maxHeight}</Card.Text>
                            
                            </Col>
                            <Col sm={6}>
                                <Card.Text>Precisión: {printer.printerPrecision}</Card.Text>
                                <Card.Text>Colores: {printer.color}</Card.Text>
                                <Card.Text>Material: {printer.material}</Card.Text>
                                {/* <Card.Text>Acabados: {printer.material}</Card.Text> */}
                                <Card.Text>Precio: {printer.servicePrice} €/mm³/</Card.Text>

                            </Col>
                        </Row>
                        {/* <Card.Text>Stock: {printer.Nombre_modelo}</Card.Text> */}
                    </Col> 
                </Row>

            </Card.Body>
        </Card>  

    );
 
}