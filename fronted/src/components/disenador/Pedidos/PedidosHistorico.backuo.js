import { Button , Row, Col, InputGroup, Form, Table, Container} from "react-bootstrap";
import { useEffect, useState } from "react";

import { Route, Routes } from 'react-router-dom';

import PedidosLista from './PedidosLista';


import LocationReseña from "./LocationReseña";
import PedidosHistorico from "./PedidosHistorico";

// Pruebas de la impresora para las vistas
import CONFIG from '../../../config/config.js';
import {pedidosPruebas} from '../../../constants/pedidosPruebas.js';

// Apis
import PedidosService from "../../../services/diseñador/pedidos.service.js";

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';

// Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado

export default function PedidosHistorico(props) {
   
    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [thePedidos, setThePedidos] = useState([]);
    
    const [thePrinters, setThePrinters] = useState([]);
    const [theFabricantes, setTheFabricantes] = useState([]);


   // Función que descarga todos los pedidos para comprar
    const download = async () => {
        let downloadPedidos;
        let downloadprinters;
        let downloadFabricantes;
            if(CONFIG.use_server){
                try {
                const response = await PedidosService.getPedidosCarrito();
                console.log(response.data);
                downloadPedidos=response.data.orders;
                console.log(downloadPedidos);
                downloadprinters=response.data.printers;
                console.log(downloadprinters);
                downloadFabricantes=response.data.users;
                console.log(downloadFabricantes);
                
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
        setTheFabricantes(downloadFabricantes);
        console.log("pedidos",thePedidos);
        console.log("printers",thePrinters);
        console.log("fabricantes",theFabricantes);
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


            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
            <Container>
                <Routes>
                    <Route path="/" element={<PedidosHistorico pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} />}  />
                    {/* <Route path="reseña/:pedidosId" element={thePedidos ? <LocationReseña pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} /> : null} /> */}
                    {/* <Route path="reseña/:pedidosId" element={thePedidos && thePrinters && theFabricantes ? <LocationReseña pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} /> : null} /> */}
                    <Route path="reseña/:pedidosId" element={<LocationReseña pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} />} />
                </Routes>
                <h2 id="AllPedidos">Todos los pedidos</h2> 
        
                <Container>
                    <Row>

                        <Col sm={2}>
                        {/* // Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado */}             
                            <TablaEstados />
                            <Button id="volver" variant="primary"  href="/">Volver</Button>
                        </Col>
                        <Col sm={10}>
                            <Row>
                                <PedidosLista pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} />
                            </Row>  
                        </Col>
                    </Row>
                </Container>

            </Container>
            }

        </div>
    );
}














