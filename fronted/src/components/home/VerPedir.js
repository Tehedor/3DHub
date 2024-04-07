import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Ver(props) {

    const printer = props.printer;

    // const printerId = props.printerId;
    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Body>

            <Row>
                <Col sm={3} class="imagen" className="d-flex justify-content-center align-items-center">
                    {/* <Image src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/> */}
                    <Card.Img src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/>
                </Col>
                <Col sm={9} class="datos_impresora">
                    <Row >
                        <Col sm={4}>
                            <Card.Text style={{color: 'black'}}>Nombre: {printer.Nombre_modelo}</Card.Text>
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
                            <Card.Text>Fabricante: {printer.Fabricante}</Card.Text>
                        </Col>
                        

                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Card.Text>Tipo: {printer.Tipo_impresora}</Card.Text>
                            <Card.Text>Max_unid: {printer.Unidades_max}</Card.Text>
                            <Card.Text>Velocidad: {printer.Velo_fabricacion}</Card.Text>
                            <Card.Text>Max_ancho: {printer.Max_ancho}</Card.Text>
                            <Card.Text>Max_alto: {printer.Max_alto}</Card.Text>
                        
                        </Col>
                        <Col sm={6}>
                            <Card.Text>Precisión: {printer.Precision}</Card.Text>
                            <Card.Text>Colores: {printer.Colores_disponibles}</Card.Text>
                            <Card.Text>Acabados: {printer.Acabados_disponibles}</Card.Text>
                            <Card.Text>Precio: {printer.Precio_servicio} €/mm³/</Card.Text>
                        </Col>
                    </Row>
                    {/* <Card.Text>Stock: {printer.Nombre_modelo}</Card.Text> */}
                </Col> 
            </Row>
            </Card.Body>
        </Card>  

    );
 
}


// Nombre_modelo": "Elegoo Saturn",
//       "Ubicación_imp": "Taller",
//       "Tipo_impresora": "SLA",
//       "Foto_impresora": "https://www.prusa3d.com/content/images/product/default/224.jpg",
//       "Precio_servicio": 0.26,
//       "Unidades_max": 1,
//       "Velo_fabricacion": 60,
//       "Max_ancho": 219,
//       "Max_alto": 120,
//       "Precision": 50,
//       "Colores_disponibles": ["Gris", "Negro"],
//       "Acabados_disponibles": ["Mate"],
//       "Fabricante": "Elegoo"