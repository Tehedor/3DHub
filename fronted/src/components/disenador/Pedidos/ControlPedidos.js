import { useEffect, useState } from "react";

import { Route, Routes } from 'react-router-dom';

import { Container} from "react-bootstrap";

import LocationReseña from "./LocationReseña";
import PedidosHistorico from "./PedidosHistorico.js";

// import {pedidosPruebas} from '../../../constants/pedidosPruebas.js';

// Apis
import PedidosService from "../../../services/diseñador/pedidos.service.js";

// Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado

export default function ControlPedidos(props) {
   
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Estados de control
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [loading, setLoading] = useState(true);
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Daros de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const [thePedidos, setThePedidos] = useState();
    const [thePrinters, setThePrinters] = useState();
    const [theFabricantes, setTheFabricantes] = useState();
    const [theReseñas, setTheReseñas] = useState();

   // Función que descarga todos los pedidos para comprar
    const download = async () => {
        let downloadPedidos;
        let downloadprinters;
        let downloadFabricantes;
        let downloadReseñas;
        try {
            const response = await PedidosService.getPedidos();
            console.log(response.data);
            downloadPedidos=response.data.orders;
            console.log(downloadPedidos);
            downloadprinters=response.data.printers;
            console.log(downloadprinters);
            downloadFabricantes=response.data.users;
            console.log(downloadFabricantes);
            downloadReseñas=response.data.reseñas;
            console.log(downloadReseñas);
        
        } catch (error) {
            // setResultados(
            // { "cod": error.cod, "message": cod.message}
            // );
        }
        setThePedidos(downloadPedidos);
        setThePrinters(downloadprinters);
        setTheFabricantes(downloadFabricantes);
        setTheReseñas(downloadReseñas);
        console.log("pedidos",thePedidos);
        console.log("printers",thePrinters);
        console.log("fabricantes",theFabricantes);
        console.log("reseñas",theReseñas);
    }


    // Efecto que se ejecuta al cargar la página
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


    return (
        <div>
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
                <Container>
                    <Routes>
                        <Route path="/" element={<PedidosHistorico pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} reseñas={theReseñas}/>}  />
                        <Route path="reseña/:pedidosId" element={<LocationReseña pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} />} />
                    </Routes>
                </Container>
            }

        </div>
    );
}














