import { Card, Row, Col, Button, Image, Table } from "react-bootstrap";

import NotificacionService from "../../../services/fabricante/notificaciones.service.js";

export default function VerNotificaciones(props) {


    const control = props.thecontrol !== undefined ? props.thecontrol : true;
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const pedidos = props.pedidos;
    const printer = props.printer;
    const diseñador = props.diseñador;
    console.log(diseñador);

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Cmabio de estados 
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const confirmarPedido = () => {
        NotificacionService.aceptadoCreando(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    const rechazrPedido = () => {
        NotificacionService.cancelarPedido(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    const revisarPedido = () => {
        NotificacionService.noAceptadoRevision(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }


    const terminarPedido = () => {
        NotificacionService.creadoEnviado(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    const deletePedido = () => {
        NotificacionService.deletePedido(pedidos.id)
            .then(() => {
                window.location.reload();
            });
    }

    const downloadFile = () => {
        NotificacionService.downloadFile(pedidos.id)   
    }

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Componente Control de estadados 
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const ControlEstados = () => {
        if (pedidos.status === "PAY") {
            return (
                <Row>
                    <Col >
                        <Row className="d-flex justify-content-center">
                            <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" style={{ width: "70px", height: "70px" }} />
                        </Row>
                        <Row style={{ marginBottom: "5px" }}>
                            <Button variant="success" size="sm" onClick={confirmarPedido}>Aceptar pedido</Button>
                        </Row>
                        {/* <Row style={{ marginBottom: "5px" }}>
                            <Button variant="warning" size="sm" onClick={revisarPedido}>Mandar a revisar</Button>
                        </Row > */}
                        <Row style={{ marginBottom: "5px" }}>
                            <Button variant="danger" size="sm" onClick={rechazrPedido}>Rechazar Pedido</Button>
                        </Row>
                        <Row>
                            <p>Esperando respuesta del Fabricante</p>
                        </Row>
                    </Col>
                </Row>
            )
        } else if (pedidos.status === "CANCELLED") {
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" style={{ width: "70px", height: "70px" }} />
                <p>Pedido Cancelado/Rechazado</p>
            </>)
        } else if (pedidos.status === "REVISION") {
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" style={{ width: "70px", height: "70px" }} />
                <p>Esperando revision del diseñador</p>
            </>)
        } else if (pedidos.status === "CREATING") {
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" style={{ width: "70px", height: "70px" }} />
                <p>Creando Pedido...</p>
                <Button variant="info" size="sm" onClick={terminarPedido}>Pedido Terminado</Button>
            </>)
        } else if (pedidos.status === "SEND") {
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon" alt="enviado" style={{ width: "70px", height: "70px" }} />
                <p>Espere a que el pedido llegue al diseñador</p>
            </>)
        } else if (pedidos.status === "DELIVERED") {
            return (
                <>
                    <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" style={{ width: "70px", height: "70px" }} />
                    <p> Pago recibido</p>
                </>

            )
        }
    }



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}>

            <Card.Header>
                <Row>
                    <Col> diseñador: {diseñador.username}</Col>
                    <Col>Printer: {printer.modelName}, ID_Impresora: {printer.id}</Col>
                    <Col><Button variant="danger" size="sm" onClick={deletePedido}>Eliminar</Button></Col>
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
                        <Table borderless style={{ lineHeight: '4px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ paddingLeft: '0px', marginRight: '2px', textAlign: 'left', width: '57%' }}>P. Envio:</td>
                                    <td style={{ textAlign: 'left' }}>{pedidos.deliveryPrice.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td style={{ paddingLeft: '0px', textAlign: 'left', width: '65%' }}>P. Producto:</td>
                                    <td style={{ textAlign: 'left' }}>{pedidos.productPrice.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td style={{ paddingLeft: '0px', textAlign: 'left', width: '57%' }}>Cantidad:</td>
                                    <td style={{ textAlign: 'left' }}>{pedidos.quantity} </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingLeft: '0px', textAlign: 'left', width: '57%' }}><strong>P. Total:</strong></td>
                                    <td style={{ textAlign: 'left' }}><strong>{((pedidos.productPrice + pedidos.deliveryPrice) * pedidos.quantity).toFixed(2)} €</strong></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>

                    <Col sm={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Row>
        
    </Row>
    <Row>
        <p>Especificaciones:</p>
        <p>{pedidos.specs}</p>
    </Row>
    <Row>
        <Button variant="primary" size="sm" onClick={downloadFile} style={{ height: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            Descargar Archivo
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-upload" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                <path d="M9 15l3 -3l3 3" />
                <path d="M12 12l0 9" />
            </svg>
        </Button>
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