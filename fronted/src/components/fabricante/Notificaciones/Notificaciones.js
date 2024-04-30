import { Button , Row, Col,  Container} from "react-bootstrap";
import { useEffect, useState } from "react";

import NotificacionesLista from './NotificacionesLista';

import {notificacionesPruebas} from '../../../constants/notificacionesPruebas.js';

// Apis
import NotificacionesService from "../../../services/fabricante/notificaciones.service";

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';


export default function Notificaciones(props) {
    
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Estados de control
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [loading, setLoading] = useState(true);
 

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Estados de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####   const [thePedidos, setThePedidos] = useState();   
    const [thePrinters, setThePrinters] = useState();
    const [theDiseñadores, setTheDiseñadores] = useState();
    const [thePedidos, setThePedidos] = useState(notificacionesPruebas);

    

   // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
   // ##### ##### Descarga de datos
   // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const download = async () => {
        let downloadPedidos;
        let downloadprinters;
        let downloadDiseñadores;

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
        setThePedidos(downloadPedidos);
        setThePrinters(downloadprinters);
        setTheDiseñadores(downloadDiseñadores);
    }

    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Duncion de carga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await download();
            setLoading(false);
            // setTimeout(()=>{
            //     setLoading(false);
            // },50);		
        }
        fetchData();
    }, []);


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return 
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
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














