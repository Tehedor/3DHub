import { useEffect, useState } from "react";

import { Button , Row, Col, Container, Table} from "react-bootstrap";

// import CarritoLista from './CarritoLista';

// import {carritoPruebas} from '../../../constants/carritoPruebas.js';

// Apis
// import CarritoService from "../../../services/diseñador/carrito.service";

export default function Pasareladepago(props) {
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <div>

            <h2 id="catálogo">Carrito</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:

                <Container>
                    <Row>

                        <Col sm={10}>
                            <Row>
                                <CarritoLista theCarrito={theCarrito}  printers={thePrinters} fabricantes={theFabricantes}/>
                            </Row>  
                        </Col>

                        <Col sm={2}>
                            {/* ######################## */}
                            {/* Tabla resumen del pedido */}
                            {/* ######################## */}
                            <Table  bordered variant="gray">

                                <tbody style={{border: '3px solid black'}}>
                                    <tr>
                                        <th  style={{fontWeight: 'normal', textDecoration: 'none'}}>Pedidos</th>
                                        <th style={{color: 'gray'}}>99 €</th>
                                    </tr>
                                    <tr>
                                        <th  style={{fontWeight: 'normal', textDecoration: 'none'}}>Envio</th>
                                        <th style={{color: 'gray'}}>20 €</th>
                                    </tr>
                                    <tr style={{border: '3px solid black'}} >
                                        <th style={{fontWeight: 'bold'}}>Total</th>
                                        <th style={{fontWeight: 'bold'}}>Mucho</th>
                                    </tr>
                                </tbody>

                            </Table>

                            {/* ######################## */}
                            {/* Boton comprar */}
                            {/* ######################## */}
                            <Button id="volver" variant="primary"  onClick={comprar} href="/">Comprar</Button>
                        </Col>

                    </Row>
                </Container>
            }
        </div>
    );
}














