import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Ver(props) {

    const printer = props.printer;

    const printerId = props.printer.id;
    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Body>

            <Row>
                <Col sm={3} class="imagen" className="d-flex justify-content-center align-items-center">
                    {/* <Image src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/> */}
                    <Card.Img src={printer.printerPhoto || 'https://m.media-amazon.com/images/I/61L4aoIqYOL._AC_SX466_.jpg'} style={{ maxWidth: "100%" }}/>  
                </Col>
                <Col sm={9} class="datos_impresora">
                    <Row >
                        <Col sm={4}>
                            <Card.Text style={{color: 'black'}}>Nombre: {printer.modelName}</Card.Text>
                        </Col>
                        <Col sm={4}>
                            <Row noGutters>
                                <Container>
                                 <Image src="http://localhost:3000/iconos/star_fill_icon.svg" height="20px" width="20px"/>
                                 <Image src="http://localhost:3000/iconos/star_fill_icon.svg" height="20px" width="20px"/>
                                 <Image src="http://localhost:3000/iconos/star_fill_icon.svg" height="20px" width="20px"/>
                                 <Image src="http://localhost:3000/iconos/star_fill_icon.svg" height="20px" width="20px"/>
                                 <Image src="http://localhost:3000/iconos/star_fill_icon.svg" height="20px" width="20px"/>
                                </Container>
                            </Row>
                            
                        </Col>
                        <Col sm={4}>
                            <Card.Text>Fabricante: {printer.userIdFabricante}</Card.Text>
                            <Card.Text>Id: {printer.id}</Card.Text>
                        </Col>
                        

                    </Row>
                    <Row>
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