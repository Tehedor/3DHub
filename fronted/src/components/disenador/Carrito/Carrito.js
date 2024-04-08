import { Button , Row, Col, InputGroup, Form, Container, Table} from "react-bootstrap";
import { useEffect, useState } from "react";

import CarritoLista from './CarritoLista';


// Pruebas de la impresora para las vistas
import CONFIG from '../../../config/config.js';
import {carritoPruebas} from '../../../constants/carritoPruebas.js';

// Apis
import CarritoService from "../../../services/diseñador/carrito.service";

export default function Carrito(props) {
    


    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [theCarrito, setTheCarrito] = useState();

  
    // Función que descarga todos los pedidos para comprar
    const download = async () => {
        let downloadCarrito;
        if(CONFIG.use_server){
            try {
            const response = await CarritoService.getPedidosCarrito();
            console.log(response.data);
            downloadCarrito=response.data;
            
            } catch (error) {
                // setResultados(
                // { "cod": error.cod, "message": cod.message}
                // );
            }
        }else{
            // downloadprinters=printersexample;
            downloadCarrito=carritoPruebas;
            // console.log(printersexample);
        }
        setTheCarrito(downloadCarrito);
        console.log(theCarrito);
    }


     // Efecto que se ejecuta al cargar la página
    useEffect(() => {
        setLoading(true);
            async function fetchData() {
            await download();
            setTimeout(()=>{
                setLoading(false);
            },800);		
        }
        fetchData();
    }, []);


    const comprar = async () => {
        for (let i = 0; i < theCarrito.length; i++) {
            CarritoService.order(theCarrito[i].id);
        }
        
    }


    return (
        <div>
            <h2 id="catálogo">impresoras</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
        
            <Container>
                <Row>

                    <Col sm={6}>
                        <Row>
                            <CarritoLista theCarrito={theCarrito} />
                        </Row>  
                    </Col>
                    <Col sm={2}>
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
                        <Button id="volver" variant="primary"  onClick={comprar} href="/">Comprar</Button>
                    </Col>
                </Row>
            </Container>

            }
        </div>
    );
}














