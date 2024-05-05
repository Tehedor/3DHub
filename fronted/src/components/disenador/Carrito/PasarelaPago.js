import { useEffect, useState } from "react";


// import { Button , Row, Col, Container, Table} from "react-bootstrap";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import PasarelaPagoLista from './PasarelaPagoLista';

import CarritoService from "../../../services/diseñador/carrito.service";

// import 'pasarelapago/Pasareladepago.css';
import './pasarelapago/PasarelaDePago.css';
// import './pasarelapago/PasarelaDePago.js';

// import CarritoLista from './CarritoLista';

// import {carritoPruebas} from '../../../constants/carritoPruebas.js';

// Apis
// import CarritoService from "../../../services/diseñador/carrito.service";

export default function Pasareladepago(props) {



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Añadir formato
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleInputChangeCard = (e) => {
        let input = e.target.value.replace(/[^0-9]/gi, '');
        let parts = [];

        for (let i = 0; i < input.length; i += 4) {
            parts.push(input.substring(i, i + 4));
        }

        setCardNumber(parts.join('-'));
    };


    const handleInputChangeDate = (e) => {
        let input = e.target.value.replace(/[^0-9]/gi, '');
        let parts = [];

        for (let i = 0; i < input.length; i += 2) {
            parts.push(input.substring(i, i + 2));
        }

        setExpiryDate(parts.join('/'));
    };

    const [paymentMethod, setPaymentMethod] = useState('credit');


    // 
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


    const precioServicio  = 0.2;


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


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Precio Total
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // const [theTotal, settheTotal] = useState(0);

    // const total = (pedidos) => {
    //     let total = 0;
    //     // for (let i = 0; i < pedidos.length; i++) {
    //     for (let i = 0; i < 1; i++) {
    //         total += 10;
    //         // total += pedidos[i].price;
    //     }
    //     settheTotal(total);
    // }
    const total = (carrito) => {
        console.log("carrito", carrito);
        console.log("carrito", carrito.length);
        let priceProductoCon = 0;
        let priceEnvioCon = 0;
        let priceTotalCon = 0;

        for (let i = 0; i < carrito.length; i++) {
            priceProductoCon = priceProductoCon + carrito[i].productPrice * carrito[i].quantity + precioServicio;
            console.log("priceProductoCon", priceProductoCon);
            priceEnvioCon = priceEnvioCon + carrito[i].deliveryPrice * carrito[i].quantity;
            console.log("priceEnvioCon", priceEnvioCon);
            priceTotalCon = priceTotalCon + (carrito[i].productPrice + carrito[i].deliveryPrice) * carrito[i].quantity + precioServicio;
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
    const comprar = async () => {
        console.log(theCarrito.length);
        console.log(theCarrito);
        // const promises = theCarrito.map(item => CarritoService.order(12));
        // const promises = theCarrito.map(item => CarritoService.order(item.id));
        // await Promise.all(promises);
        
        // CarritoService.order(theCarrito[0].id)

        for (let i = 0; i < theCarrito.length; i++) {
            console.log(theCarrito[i].id);
            CarritoService.order(theCarrito[i].id);
        }


    }




    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <div>

            {/* <h2 id="catálogo">Carrito</h2>  */}
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" /> :

                <Container fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} lg={11}>
                            <Card className="card0 rounded-0">
                                <Row>
                                    <Col md={5} className="d-md-block d-none p-0 box">
                                        <Card className="rounded-0 border-0 card1" id="bill">
                                            <h3 id="heading1"><strong>Resumen Pedido</strong></h3>

                                            {/* <PasarelaPagoLista theCarrito={theCarrito} thePrinters={thePrinters} theFabricantes={theFabricantes} /> */}
                                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                                <PasarelaPagoLista theCarrito={theCarrito} thePrinters={thePrinters} theFabricantes={theFabricantes} />
                                            </div>
                                            {/* <Row>
                                                <Col lg={7} xs={8} className="mt-4 line pl-4">
                                                    <h2 className="bill-head">Electronics</h2>
                                                    <small className="bill-date">2017 Feb 10 at 10:30 PM</small>
                                                </Col>
                                                <Col lg={5} xs={4} className="mt-4">
                                                    <h2 className="bill-head px-xl-5 px-lg-4">CAF</h2>
                                                </Col>
                                            </Row> */}
                                            {/* <Row>
                                                <Col lg={7} xs={8} className="mt-4 line pl-4">
                                                    <h2 className="bill-head">Food</h2>
                                                    <small className="bill-date">2017 Feb 25 at 11:30 PM</small>
                                                </Col>
                                                <Col lg={5} xs={4} className="mt-4">
                                                    <h2 className="bill-head px-xl-5 px-lg-4">JFK</h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={7} xs={8} className="mt-4 line pl-4">
                                                    <h2 className="bill-head">Grocery</h2>
                                                    <small className="bill-date">2017 Mar 17 at 10:45 PM</small><br/>
                                                    <small className="bill-date">2017 Mar 18 at 11:45 PM</small>
                                                </Col>
                                                <Col lg={5} xs={4} className="mt-4">
                                                    <h2 className="bill-head px-xl-5 px-lg-4">LHR</h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={7} xs={8} className="mt-4 line pl-4">
                                                    <h2 className="bill-head">Accessories</h2>
                                                    <small className="bill-date">2017 Apr 13 at 05:30 PM</small>
                                                </Col>
                                                <Col lg={5} xs={4} className="mt-4">
                                                    <h2 className="bill-head px-xl-5 px-lg-4">JFK</h2>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={12} className="red-bg">
                                                    <p className="bill-date" id="total-label">Precio Total</p>
                                                    <h2 className="bill-head" id="total"> {priceTotal.toFixed(2)}</h2>
                                                    {/* <small className="bill-date" id="total-label">Price includes all taxes</small> */}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col md={7} sm={12} className="p-0 box">
                                        <Card className="rounded-0 border-0 card2" id="paypage">
                                            <div className="form-card">
                                                <h2 id="heading2" className="text-danger">Método de Pago</h2>
                                                <div className="radio-group">
                                                    <div className='radio selected' data-value="credit" onClick={() => setPaymentMethod('credit')}>
                                                        <img src="https://i.imgur.com/28akQFX.jpg" width="200px" height="60px" />
                                                    </div>
                                                    <div className='radio' data-value="paypal" onClick={() => setPaymentMethod('paypal')}>
                                                        <img src="https://i.imgur.com/5QFsx7K.jpg" width="200px" height="60px" />
                                                    </div>
                                                    <br />
                                                </div>
                                                {paymentMethod === 'credit' ? (
                                                    <>
                                                        <label className="pay">Nombre de la Tarjeta</label>
                                                        <input type="text" name="holdername" placeholder="John Smith" />
                                                        <Row>
                                                            <Col xs={8} md={6}>
                                                                <label className="pay">Numero Tarjeta</label>
                                                                <input type="text" value={cardNumber} onChange={handleInputChangeCard} name="cardno" id="cr_no" placeholder="0000-0000-0000-0000" minLength="19" maxLength="19" />
                                                            </Col>
                                                            <Col xs={4} md={6}>
                                                                <label className="pay">CVV</label>
                                                                <input type="password" value={cvv} onChange={setCvv} name="cvcpwd" placeholder="&#9679;&#9679;&#9679;" className="placeicon" minLength="3" maxLength="3" />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <label className="pay">Fecha caducidad</label>
                                                            </Col>
                                                            <Col md={12}>
                                                                <input type="text" value={expiryDate} onChange={handleInputChangeDate} name="exp" id="exp" placeholder="MM/YY" minLength="5" maxLength="5" />
                                                            </Col>
                                                        </Row>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="pay">Email</label>
                                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="johnsmith@example.com" />
                                                        <label className="pay">Contraseña</label>
                                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Contraseña Paypal" />
                                                    </>
                                                )}
                                                <Row>
                                                    <Col md={12}>
                                                        {/* ######################## */}
                                                        {/* Boton comprar */}
                                                        {/* ######################## */}
                                                        <Button id="volver" variant="primary" onClick={comprar} href="/">Comprar</Button>
                                                        {/* <input type="submit" value="Comprar &nbsp; &#xf178;" className="btn btn-info placeicon"/> */}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
}














