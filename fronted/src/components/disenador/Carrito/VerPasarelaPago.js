import { Card, Row, Col, Button } from "react-bootstrap";

import "./pasarelapago/PasarelaDePago.css";

// Apis
import CarritoService from "../../../services/diseñador/carrito.service";

export default function VerPedidoCarrito(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const carrito = props.carrito;
    const printer = props.printer;
    const fabricante = props.fabricante;

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Función eliminar pedido
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const eliminarPedido = () => {
        console.log("Eliminando pedido");
        console.log(carrito.id);
        CarritoService.deletePedido(carrito.id);
    }


    // const total = carrito.price + carrito.deliveryPrice;
    // const total = 35;

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (


        <div style={{ borderBottom: '1px solid lightgray', width: '90%', margin: 'auto' }}>
            <Row>
                <Col lg={5} xs={5}>
                    <p style={{ marginTop: "10px" }}></p>
                    <p><small className="bill-date"><strong>Pedido_ID: {carrito.id}</strong></small></p>
                    <p><small className="bill-date" style={{ wordWrap: 'break-word' }}>Dirección: {carrito.address}</small></p>
                </Col>
                <Col lg={5} xs={5}>
                    <p style={{ margin: "35px" }}></p>
                    <p style={{ margin: 0 }}><small className="bill-date px-xl-4 px-lg-4">Precio: {carrito.productPrice} €</small></p>
                    <p style={{ margin: 0 }}><small className="bill-date px-xl-4 px-lg-4">Envio: {carrito.deliveryPrice} €</small></p>
                    <p style={{ margin: 0 }}><small className="bill-date px-xl-4 px-lg-4">Cantidad: {carrito.quantity}</small></p>
                    <p style={{ margin: 0 }}> <small className="bill-date px-xl-4 px-lg-4"><strong>Total: {(carrito.productPrice + carrito.deliveryPrice) * carrito.quantity} €</strong> </small></p>
                </Col>
            </Row>
        </div>

    );
}