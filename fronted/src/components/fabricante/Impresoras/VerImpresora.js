import { Card, Row, Col, Button } from "react-bootstrap";

// Apis
import ImpresorasServiceFabri from "../../../services/fabricante/impresoras.fabri.service";

export default function VerImpresora(props) {

    const printer = props.printer;
    const printerId = printer.id;

    const deletePrinter = () => {
        // console.log("ideliminar", printerId);      
        ImpresorasServiceFabri.deletePrinter(printerId);
        window.location.reload();
    };
    console.log("printer", printer);
    console.log("printer", printer.urlPhoto);

    return (
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}>
            <Card.Body>
                <Row>

                    <Col sm={3} class="imagen" className="d-flex justify-content-center align-items-center">
                        {/* <Image src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/> */}
                        {/* <Card.Img src={printer.urlPhoto } style={{ maxWidth: "100%" }} /> */}
                        <Card.Img src={printer.urlPhoto || 'http://localhost:3000/printer_default.jpg'} style={{ maxWidth: "100%" }} />
                    </Col>

                    <Col sm={9} class="datos_impresora">


                        <Row  style={{ color: 'black', marginBottom:"10px" }}>
                            <Col md={6}>
                                <Card.Text className="text-start" style={{ color: 'black', marginLeft:"90px" }}>
                                    Nombre: <strong>{printer.modelName}</strong>
                                </Card.Text>
                            </Col>
                            <Col md={6}>
                            <Button variant="danger" onClick={deletePrinter} >Eliminar Impresoras</Button>
                            </Col>
                        </Row>
                        {/* <Row > */}
                        {/* <Card.Text style={{ color: 'black' }}>Nombre: <strong>{printer.modelName}</strong></Card.Text> */}
                        {/* <Col sm={5}>
                            </Col> */}
                        {/* 
                            <Col sm={4}>

                            </Col>
                            <Col sm={4}>
                                <Card.Text>Fabricante: {printer.Fabricante}</Card.Text>
                            </Col> */}
                        {/* </Row> */}

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

                    </Col>
                                
                    {/* <Col>
                        
                    </Col> */}

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