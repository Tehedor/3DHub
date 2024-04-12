import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import StarRatings from 'react-star-ratings';


import PedirPedido from "../../home/PedirPedido";


import PedidosService from "../../../services/diseñador/pedidos.service.js";

export default function VerPedidos(props) {

    // const pedidos = props.pedidos;
    const control = props.thecontrol !== undefined ? props.thecontrol : true;
    
    const controlReseña = props.reseña === false ? false : true;
    
    const pedidos = props.pedidos;
    const printer = props.printer;
    const fabricante = props.fabricante;

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

    const ControlEstados = () => {
        if (pedidos.status === "PAY"){
            console.log(pedidos.status);
            return (
                <>
                    <Row  className="justify-content-md-center align-items-center"> 
                         <Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" style={{width: "70px", height: "70px"}} />
                        
                    </Row>
                    <Row>
                        <p>Esperando respuesta del Fabricante</p>
                    </Row>
                </>
            );
            
        }else if(pedidos.status === "CANCELLED"){
            return (
                <>
                    <Row  className="justify-content-md-center align-items-center"> 
                        <Image src={"http://localhost:3000/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" style={{width: "70px", height: "70px"}}/>
                    </Row>
                    <Row>
                        <p>Pedido Cancelado/Rechazado</p>
                    </Row>
                </>
            )
        }else if(pedidos.status === "REVISION"){
            return (
                <>  
                     <Row  className="justify-content-md-center align-items-center"> 
                        <Image src={"http://localhost:3000/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" style={{width: "70px", height: "70px"}}/>
                    </Row>
                    <Row>
                        <Button variant="warning" size="sm" onClick={confirmarRevision}>Revisiar Pedido</Button>
                    </Row>
                </>
            )

        }else if(pedidos.status === "CREATING"){
            return (
                <>
                    <Row  className="justify-content-md-center align-items-center">
                        <Image src={"http://localhost:3000/iconos_estados/creando.svg"} className="icon" alt="creando" style={{width: "70px", height: "70px"}}/>
                    </Row>
                    <Row>    
                        <p>Creando Pedido...</p>
                    </Row>
                </>
            )
        }else if(pedidos.status === "SEND"){
            return (
                <>
                <Row  className="justify-content-md-center align-items-center"> 
                    <Image src={"http://localhost:3000/iconos_estados/enviado.svg"} className="icon"  alt="enviado" style={{width: "70px", height: "70px"}} />
                </Row>
                <Row>
                    <Button variant="warning" size="sm" onClick={confirmarEntrega} >Confirmar Entrega</Button>
                </Row>
                </>
            )
        }else if(pedidos.status === "DELIVERED"){
            return (
                <>
                    <Row  className="justify-content-md-center align-items-center"> 
                        <Image src={"http://localhost:3000/iconos_estados/terminado.svg"} className="icon" alt="terminado" style={{width: "70px", height: "70px"}}/>
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
    
    
       

    
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
            
        {/* <Card border="gray" style={{ backgroundColor: "white", marginTop: '0', height: '320px' }}>  */}
            <Card.Header   style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>
                <Row>
                    <Col>
                        {/* Fabricante: Juan */}
                        {/* Fabricante: {fabricante.username || "No disponible"} */}
                        Fabricante: {fabricante ? fabricante.username : printer.userIdFabricante}
                    </Col>
                    <Col>
                        
                        Printer: {printer.modelName}, ID_Impresora: {printer.id}
                        
                    </Col>
 
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

                    
                        {/* <Card.Text>Stock: {pedidos.Nombre_modelo}</Card.Text> */}
                    </Col> 
                    <Col sm={3}>

                    </Col>
                    {/* <Col sm={3} class="boton" className="d-flex justify-content-center align-items-center"> */}
                    <Col sm={3} className="controlEstados">
                        {control ? ControlEstados() : null}
                    </Col>
                </Row>
           
            </Card.Body>
        </Card>  

    );

}