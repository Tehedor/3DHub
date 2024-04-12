import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import CarritoService from "../../../services/diseñador/carrito.service";

export default function VerPedidoCarrito(props) {

    const carrito = props.carrito;
    const printer = props.printer;
    const fabricante = props.fabricante;

    const eliminarPedido = () => { 
        console.log("Eliminando pedido");
        console.log(carrito.id);
        CarritoService.deletePedido(carrito.id);
    }
    
    return(
        <Card border="gray" > 
        {/* <Card border="gray: ender 3" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Header   style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}>
                <Row>
                    <Col lm={5}>
                        {/* Fabricante: Juan */}
                        Fabricante: {fabricante ? fabricante.username : printer.userIdFabricante}
                    </Col>
                    <Col lm={5}>
                        
                        Printer: {printer.modelName}, ID_Impresora: {printer.id}
                        
                    </Col>

                    <Col lm={2}>
                        <Button variant="danger" size="sm" onClick={eliminarPedido}>Eliminar</Button>
                        
                    </Col>
 
                </Row>
            </Card.Header>
            <Card.Body>
                
                <Row>
                    <Col >
                        

                        <Row>id: {carrito.id}</Row>
                        <Row>Fecha de pedido: {carrito.orderdate}</Row>
                        <Row>Fecha de fabricación: {carrito.manufacturerdate}</Row>
                        <Row>Fecha de recogida: {carrito.pickupdate}</Row>
                        <Row>Número de impresoras: {carrito.number}</Row>
                        <Row>Estado: {carrito.status}</Row>
                        <Row>Especificaciones: {carrito.specs}</Row>

                    
                        {/* <Card.Text>Stock: {carrito.Nombre_modelo}</Card.Text> */}
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