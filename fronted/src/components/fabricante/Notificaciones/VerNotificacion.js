import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import PedirPedido from "../../home/PedirPedido";

import NotificacionService from "../../../services/fabricante/notificaciones.service.js";

export default function VerNotificaciones(props) {

    const printer = props.printer;


    const confirmarPedido = () => {
        NotificacionService.aceptadoCreando(printer.id_pedido)
    }

    const rechazrPedido = () => {
        NotificacionService.cancelarPedido(printer.id_pedido)
    }
    
    const revisarPedido = () => {
        NotificacionService.noAceptadoRevision(printer.id_pedido)
    }
    
    
    const terminarPedido = () => {
        NotificacionService.creadoEnviado(printer.id_pedido)
    }           

    const ControlEstados = () => {
        if (printer.Estado === "PAY"){
            <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" />
            {<Button variant="success" size="sm" onClick={confirmarPedido}>Aceptar pedido</Button>}
            {<Button variant="warning" size="sm" onClick={rechazrPedido}>Rechazar Pedido</Button>}
            {<Button variant="danger" size="sm" onClick={revisarPedido}>Mandar a revisar</Button>}
            {<p>Esperando respuesta del Fabricante</p>}
        }else if(printer.Estado === "CANCELLED"){
            <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" />
            {<p>Pedido Cancelado/Rechazado</p>}
        }else if(printer.Estado === "REVISION"){
            <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" />
            {<p>Esperando revision del diseñador</p>}
        }else if(printer.Estado === "CREATING"){
            <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" />
            {<p>Creando Pedido...</p>}
            {<Button variant="info" size="sm" onClick={terminarPedido}>Pedido Terminado</Button>}
        }else if(printer.Estado === "SEND"){
            <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon" alt="enviado" />
            {<p>Espere a que el pedido llegue al diseñador</p>}
        }else if(printer.Estado === "DELIVERED"){
            <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" />
        }
    }
    
       

    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Body>

            <Row>
                <Col sm={3} class="imagen" className="d-flex justify-content-center align-items-center">
                    {/* <Image src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/> */}
                    <Card.Img src={printer.Foto_impresora} thumbnail  style={{ maxWidth: "100%" }}/>
                </Col>
                <Col sm={7} class="datos_impresora">
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
                <Col sm={2} class="boton" className="d-flex justify-content-center align-items-center">
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