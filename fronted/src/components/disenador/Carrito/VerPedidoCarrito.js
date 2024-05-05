import { Card, Row, Col, Button, Table } from "react-bootstrap";

// Apis
import CarritoService from "../../../services/diseñador/carrito.service";

export default function VerPedidoCarrito(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const carrito = props.carrito;
    console.log("carrito", carrito);
    const printer = props.printer;
    console.log("printer", printer);
    const fabricante = props.fabricante;
    console.log("fabricante", fabricante);

    const precioServicio  = 0.2;


    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Función eliminar pedido
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const eliminarPedido = () => {
        console.log("Eliminando pedido");
        console.log(carrito.id);
        CarritoService.deletePedido(carrito.id);
    }

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <Card border="gray" >

            <Card.Header style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}>
                <Row>

                    <Col lm={5}>
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
                    <Col md={4}>
                        <Row className="text-start">Nº de Pedido: {carrito.id}</Row>
                        <Row className="text-start">Fecha de pedido: {new Date(carrito.orderDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start">Fecha de fabricación: {new Date(carrito.manufacturerDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start">Fecha de entrega: {new Date(carrito.deliveryDate).toLocaleDateString('es-ES')}</Row>
                        <Row className="text-start">Dirección: {carrito.address}</Row>
                    </Col>
                    <Col md={4} >
                        <Row>
                            <p>Especificaciones:</p>
                            <p>{carrito.specs}</p>
                        </Row>
                    </Col>
                    <Col md={4} >
                        <Table responsive="sm" bordered striped style={{ border: '2px solid black' }}>
                            <tbody>
                                <tr>
                                    <td>Precio Producto</td>
                                    <td>{carrito.productPrice.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td>Precio Envio</td>
                                    <td>{carrito.deliveryPrice.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td>Cantidad impresiones</td>
                                    <td>{carrito.quantity}</td>
                                </tr>
                                <tr>
                                    <td>Precio Servicio</td>
                                    <td>{precioServicio.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td><strong>Precio Total</strong></td>
                                    <td><strong>{((carrito.productPrice + carrito.deliveryPrice) * carrito.quantity + precioServicio).toFixed(2)} €</strong></td>
                                </tr>
                            </tbody>
                        </Table>
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