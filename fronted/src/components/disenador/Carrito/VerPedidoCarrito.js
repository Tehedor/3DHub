import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function VerPedidoCarrito(props) {

    const carrito = props.carrito;
    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Body>

                <Row>id: {carrito.id}</Row>
                <Row>Fecha de pedido: {carrito.orderdate}</Row>
                <Row>Fecha de fabricación: {carrito.manufacturerdate}</Row>
                <Row>Fecha de recogida: {carrito.pickupdate}</Row>
                <Row>Número de impresoras: {carrito.number}</Row>
                <Row>Estado: {carrito.status}</Row>
                <Row>Especificaciones: {carrito.specs}</Row>

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