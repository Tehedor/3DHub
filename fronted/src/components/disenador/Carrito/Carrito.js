import { useEffect, useState } from "react";

import { Button, Row, Col, Container, Table } from "react-bootstrap";

import CarritoLista from './CarritoLista';

// import {carritoPruebas} from '../../../constants/carritoPruebas.js';

// Apis
import CarritoService from "../../../services/diseñador/carrito.service";
import { Prev } from "react-bootstrap/esm/PageItem";

export default function Carrito(props) {


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Estados de control
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [loading, setLoading] = useState(true);

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos descargados
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [theCarrito, setTheCarrito] = useState();
    const [thePrinters, setThePrinters] = useState();
    const [theFabricantes, setTheFabricantes] = useState();


    const [priceProducto, setPriceProducto] = useState(0);
    const [priceEnvio, setPriceEnvio] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);




    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const download = async () => {
        let downloadCarrito;
        let downloadprinters;
        let downloadFabricantes;
        try {

            const response = await CarritoService.getPedidosCarrito();
            console.log(response.data);
            downloadCarrito = response.data.orders;
            console.log("carrito", downloadCarrito);
            downloadprinters = response.data.printers;
            console.log(downloadprinters);
            downloadFabricantes = response.data.users;
            console.log(downloadFabricantes);
            setTheCarrito(downloadCarrito);
            setThePrinters(downloadprinters);
            setTheFabricantes(downloadFabricantes);
            console.log("pedidos", theCarrito);
            console.log("pedidoslength", theCarrito);
            console.log("printers", thePrinters);
            console.log("fabricantes", theFabricantes);
            total(downloadCarrito);

        } catch (error) {
            // setResultados(
            // { "cod": error.cod, "message": cod.message}
            // );
        }
    }

    const total = (carrito) => {
        console.log("carrito", carrito);
        console.log("carrito", carrito.length);
        let priceProductoCon = 0;
        let priceEnvioCon = 0;
        let priceTotalCon = 0;

        for (let i = 0; i < carrito.length; i++) {
            priceProductoCon = priceProductoCon + carrito[i].productPrice * carrito[i].quantity;
            console.log("priceProductoCon", priceProductoCon);
            priceEnvioCon = priceEnvioCon + carrito[i].deliveryPrice * carrito[i].quantity;
            console.log("priceEnvioCon", priceEnvioCon);
            priceTotalCon = priceTotalCon + (carrito[i].productPrice + carrito[i].deliveryPrice) * carrito[i].quantity;
            console.log("priceTotalCon", priceTotalCon);
        }
        setPriceProducto(priceProductoCon);
        setPriceEnvio(priceEnvioCon);
        setPriceTotal(priceTotalCon);
    }



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de carga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await download();
            setLoading(false);
        }
        fetchData();
    }, []);


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de comprar (cambio de estado a "PAY")
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // const comprar = () => {
    //     for (let i = 0; i < theCarrito.length; i++) {
    //         console.log("carrito",theCarrito[i].id);    
    //         if(theCarrito[i].status === "KART"){
    //             CarritoService.order(theCarrito[i].id);
    //         }
    //     }
    // }



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <div>

            <h2 id="catálogo">Carrito</h2>
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" /> :

                <Container>
                    <Row>

                        <Col sm={10}>
                            <Row>
                                <CarritoLista theCarrito={theCarrito} printers={thePrinters} fabricantes={theFabricantes} />
                            </Row>
                        </Col>

                        <Col sm={2}>
                            {/* ######################## */}
                            {/* Tabla resumen del pedido */}
                            {/* ######################## */}
                            <Table bordered variant="gray">

                                <tbody style={{ border: '3px solid black' }}>
                                    <tr>
                                        <th style={{ fontWeight: 'normal', textDecoration: 'none' }}>Pedidos</th>
                                        <th style={{ color: 'gray' }}>{priceProducto}</th>
                                    </tr>
                                    <tr>
                                        <th style={{ fontWeight: 'normal', textDecoration: 'none' }}>Envio</th>
                                        <th style={{ color: 'gray' }}>{priceEnvio}</th>
                                    </tr>
                                    <tr style={{ border: '3px solid black' }} >
                                        <th style={{ fontWeight: 'bold' }}>Total</th>
                                        <th style={{ fontWeight: 'bold' }}>{priceTotal}</th>
                                    </tr>
                                </tbody>

                            </Table>

                            {/* ######################## */}
                            {/* Boton comprar */}
                            {/* ######################## */}
                            {/* <Button id="volver" variant="primary"  onClick={comprar} href="/">Comprar</Button> */}
                            <Button id="volver" variant="primary" href="/carritocompra/pasarelapago">Comprar</Button>
                        </Col>

                    </Row>
                </Container>
            }
        </div>
    );
}














