import { Button , Row, Col, InputGroup, Form, Container} from "react-bootstrap";
import { useEffect, useState } from "react";

import NotificacionesLista from './NotificacionesLista';

// Pruebas de la impresora para las vistas
import CONFIG from '../../../config/config.js';
import {notificacionesPruebas} from '../../../constants/notificacionesPruebas.js';


// Apis
import NotificacionesService from "../../../services/fabricante/notificaciones.service";

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';


export default function Notificaciones(props) {

    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [thePedidos, setThePedidos] = useState();



    // Función que descarga las impresoras, en función de la localización en la que se encuentra
    const download = async () => {
        let downloadpedidos;
    
        // Poner la manerad para solicitar las impresoras en función de la localizaciónSs
        if(CONFIG.use_server){
            //////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////
            try {
                
                // const data = await NotificacionesService.descargar(queryparams);
                // console.log(data);
                
                // downloadpedidos=data;
            } catch (error) {
                // setResultados(
                    //   { "cod": error.cod, "message": cod.message}
                    // );
                }
            }else{
            downloadpedidos=notificacionesPruebas;
            //////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////
        }
        setThePedidos(downloadpedidos);
        console.log(thePedidos);
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
            <h2 id="catálogo">Notificaciones</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
        

            <Container>
                <Col sm={2}>
                {/* // Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado */}             
                    <TablaEstados />
                </Col>
                <Col sm={10}>
                    {/* <Row>
                        <NotificacionesLista printers={props.controlPrinters.printers} />
                    </Row>   */}
                    <Button id="volver" variant="primary"  href="/">Volver</Button>
                </Col>
            </Container>

                }

        </div>
    );
}














