import { Card,Row, Col, Button, Image} from "react-bootstrap";

import NotificacionService from "../../../services/fabricante/notificaciones.service.js";

export default function VerNotificaciones(props) {

    const pedidos = props.pedidos;
    const printer = props.printer;
    const diseñador = props.diseñador;

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


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Componente Control de estadados 
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

    const ControlEstados = () => {
        if (pedidos.status === "PAY"){
            return (
                <>
                    <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" style={{width: "70px", height: "70px"}} />
                    <Button variant="success" size="sm" onClick={confirmarPedido}>Aceptar pedido</Button>
                    <Button variant="warning" size="sm" onClick={revisarPedido}>Mandar a revisar</Button>
                    <Button variant="danger" size="sm" onClick={rechazrPedido}>Rechazar Pedido</Button>
                    <p>Esperando respuesta del Fabricante</p>
                </>
            )
        }else if(pedidos.status === "CANCELLED"){
            return (<>
            <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" style={{width: "70px", height: "70px"}} />
            <p>Pedido Cancelado/Rechazado</p>
            </>)
        }else if(pedidos.status === "REVISION"){
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" style={{width: "70px", height: "70px"}} />
                <p>Esperando revision del diseñador</p>
            </>)
        }else if(pedidos.status === "CREATING"){
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" style={{width: "70px", height: "70px"}} />
                <p>Creando Pedido...</p>
                <Button variant="info" size="sm" onClick={terminarPedido}>Pedido Terminado</Button>
            </>)
        }else if(pedidos.status === "SEND"){
            return (<>
                <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon" alt="enviado" style={{width: "70px", height: "70px"}} />
                <p>Espere a que el pedido llegue al diseñador</p>
            </>)
        }else if(pedidos.status === "DELIVERED"){
            return (
                <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" style={{width: "70px", height: "70px"}} />
            )
        }
    }
    
       

    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
            
            <Card.Header>
                <Row>

                    <Col> diseñador: { diseñador.username}</Col>

                    <Col>Printer: {printer.modelName}, ID_Impresora: {printer.id}</Col>

                    <Col><Button variant="danger" size="sm" onClick={deletePedido}>Eliminar</Button></Col>
 
                </Row>
            </Card.Header>

            <Card.Body>
                <Row>
                    <Col sm={6} class="datos_impresora">
                        
                        <Row>id: {pedidos.id}</Row>
                        <Row>Fecha de pedido: {pedidos.orderdate}</Row>
                        <Row>Fecha de fabricación: {pedidos.manufacturerdate}</Row>
                        <Row>Fecha de recogida: {pedidos.pickupdate}</Row>
                        <Row>Número de impresoras: {pedidos.number}</Row>
                        <Row>Estado: {pedidos.status}</Row>
                        <Row>Especificaciones: {pedidos.specs}</Row>
                    
                    </Col> 
                    <Col sm={3}>

                    </Col>
                    <Col sm={3} class="controlEstados "  >
                        {ControlEstados()}
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