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
        
        // Poner la manerad para solicitar las impresoras en función de la localizaciónSs
        if(CONFIG.use_server){
            try {
            // if(isGeolocationEnabled || !queryUbica===""){
            //     if (!queryUbica===""){
            //     // api que me permita sacar latitud y longitud de la ubicación a partir de la query 
            //     }else{
            //     latitude=coords.latitude;
            //     longitude=coords.longitude;
            //     }
            // }
            // let queryparams =  "?lat=" + latitude + "&lon=" + longitude;
            // let queryparams =  "";
            // const data = await CarritoService.descargar(queryparams);
            // console.log(data);

            // setTheCarrito=data;
            } catch (error) {
            // setResultados(
            //   { "cod": error.cod, "message": cod.message}
            // );
            }
        }else{
            // downloadprinters=printersexample;
            downloadCarrito=carritoPruebas;
            // console.log(printersexample);
        }
        setTheCarrito(downloadCarrito);
        // console.log(theprinters);
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


    return (
        <div>
            <h2 id="catálogo">impresoras</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
        
            <Container>
                <Col sm={10}>
                    <Row>
                        {/* <CarritoLista pedidos={props.theCarrito.pedidos} /> */}
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
                    <Button id="volver" variant="primary"  href="/">Comprar</Button>
                </Col>
            </Container>

            }
        </div>
    );
}














