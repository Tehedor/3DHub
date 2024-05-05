import { Link } from "react-router-dom";

import { Container, Card, Row, Col, Button, Image, Table } from "react-bootstrap";

import StarRatings from 'react-star-ratings';

import PedirPedido from "../../home/PedirPedido";

// Apis
import PedidosService from "../../../services/diseñador/pedidos.service.js";

export default function VerPedidos(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos de Control
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const control = props.thecontrol !== undefined ? props.thecontrol : true;
    const controlReseña = props.reseña === false ? false : true;

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos descargados
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const pedidos = props.pedidos;
    const printer = props.printer;
    const fabricante = props.fabricante;



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de cambio de estado
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const confirmarEntrega = () => {
        // PedidosService.confirmarEntrga(pedidos.id_pedido)
        PedidosService.confirmarEntrga(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    const confirmarRevision = () => {
        // PedidosService.confirmarRevision(pedidos.id_pedido)
        PedidosService.confirmarRevision(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Control de estados
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const ControlEstados = () => {
        if (pedidos.status === "PAY") {
            console.log(pedidos.status);
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <p>Esperando respuesta del Fabricante</p>
                    </Row>
                </>
            );

        } else if (pedidos.status === "CANCELLED") {
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <p>Pedido Cancelado/Rechazado</p>
                    </Row>
                </>
            )
        } else if (pedidos.status === "REVISION") {
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <Button variant="warning" size="sm" onClick={confirmarRevision}>Revisiar Pedido</Button>
                    </Row>
                </>
            )

        } else if (pedidos.status === "CREATING") {
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <p>Creando Pedido...</p>
                    </Row>
                </>
            )
        } else if (pedidos.status === "SEND") {
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon" alt="enviado" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <Button variant="warning" size="sm" onClick={confirmarEntrega} >Confirmar Entrega</Button>
                    </Row>
                </>
            )
        } else if (pedidos.status === "DELIVERED") {
            return (
                <>
                    <Row className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" style={{ width: "70px", height: "70px" }} />
                    </Row>

                    <Row>
                        <   p> Completado </p>
                    </Row>

                    <Row>
                        {!controlReseña ?

                            <Link to={`./reseña/${pedidos.id}`}>
                                <Button variant="warning" size="sm">Añadir Reseña</Button>
                            </Link>

                            :

                            <Container>

                                <Row>
                                    <label>Valoración del producto</label>
                                    <StarRatings
                                        rating={props.reseña.valorProducto}
                                        starRatedColor="orange"
                                        numberOfStars={5}
                                        name='ratingProducto'
                                    />
                                </Row>

                                <Row>
                                    <label>Valoración del fabricante</label>
                                    <StarRatings
                                        rating={props.reseña.valorFabricante}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='ratingFabricante'
                                    />
                                </Row>

                                <Row>
                                    <p>
                                        {props.reseña.reseñaTexto}
                                    </p>
                                </Row>
                            </Container>

                        }
                    </Row>

                </>
            )
        }
    }





    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}>

            <Card.Header style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>
                <Row>

                    <Col>
                        Fabricante: {fabricante ? fabricante.username : printer.userIdFabricante}
                    </Col>

                    <Col>

                        Printer: {printer.modelName}, ID_Impresora: {printer.id}

                    </Col>

                </Row>
            </Card.Header>

            <Card.Body>

                <Row>
                    <Col md={4}>
                        <Row className="text-start">Nº de Pedido: {pedidos.id}</Row>
                        <Row className="text-start">Fecha de pedido: {new Date(pedidos.orderDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start">Fecha de fabricación: {new Date(pedidos.manufacturerDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start">Fecha de entrega: {new Date(pedidos.deliveryDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start" style={{ marginTop: "4px", marginBottom: "4px" }}>Dirección: {pedidos.address}</Row>
                        <Row className="text-start"><strong>Precio Total: {(pedidos.productPrice + pedidos.deliveryPrice) * pedidos.quantity} €</strong></Row>
                    </Col>

                    <Col sm={4}>
                        <Row>
                            <p>Especificaciones:</p>
                            <p>{pedidos.specs}</p>
                        </Row>
                    </Col>

                    <Col sm={4} className="controlEstados">
                        {control ? ControlEstados() : null}
                    </Col>

                </Row>

            </Card.Body>

        </Card>
    );

}