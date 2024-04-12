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

    //  // Estado en el que muestra el spinner si esta cargando
    //  const [loading, setLoading] = useState(true);
 
    //  // Estado en el que se alamcenan las impresoras
    // const [thePedidos, setThePedidos] = useState();

    const [loading, setLoading] = useState(true);
 
    // Estado en el que se alamcenan las impresoras
   const [thePedidos, setThePedidos] = useState();
   
   const [thePrinters, setThePrinters] = useState();
   const [theDiseñadores, setTheDiseñadores] = useState();



   // Función que descarga todos los pedidos para comprar
    const download = async () => {
        let downloadPedidos;
        let downloadprinters;
        let downloadDiseñadores;

            if(CONFIG.use_server){
                try {
                const response = await NotificacionesService.getPedidosFabricante();
                console.log(response.data);
                downloadPedidos=response.data.orders;
                console.log(downloadPedidos);
                downloadprinters=response.data.printers;
                console.log(downloadprinters);
                downloadDiseñadores=response.data.users;
                console.log(downloadDiseñadores);

                
                } catch (error) {
                    // setResultados(
                    // { "cod": error.cod, "message": cod.message}
                    // );
                }
            }else{
                // downloadprinters=printersexample;
                // downloadPedidos=carritoPruebas;
                // console.log(printersexample);
            }
        setThePedidos(downloadPedidos);
        setThePrinters(downloadprinters);
        setTheDiseñadores(downloadDiseñadores);
        console.log(thePedidos);
    }


    // Efecto que se ejecuta al cargar la página
    useEffect(() => {
        setLoading(true);
            async function fetchData() {
            await download();
            setTimeout(()=>{
                setLoading(false);
            },50);		
        }
        fetchData();
    }, []);


    return (
        <div>
            <h2 id="catálogo">Notificaciones</h2> 
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
        

            <Container>
                <Row>
                    <Col sm={2}>
                    {/* // Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado */}             
                        <TablaEstados />
                        <Button id="volver" variant="primary"  href="/">Volver</Button>
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <NotificacionesLista  pedidos={thePedidos} printers={thePrinters} diseñadores={theDiseñadores} />
                        </Row>   
                        <Button id="volver" variant="primary"  href="/">Volver</Button>
                    </Col>
                </Row>
            </Container>

                }

        </div>
    );
}














