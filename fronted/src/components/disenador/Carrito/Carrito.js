import { Button , Row, Col, InputGroup, Form} from "react-bootstrap";
import { useEffect, useState } from "react";

import CarritoLista from './CarritoLista';


// Pruebas de la impresora para las vistas
import CONFIG from '../../config/config.js';
import {carritoPruebas} from '../../../constants/carritoPruebas.js';

// Apis
import ImpresorasService from "../../services/imprsoras.service";

export default function Carrito(props) {
    


    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [thePedidos, setThePedidos] = useState();

  
    // Función que descarga todos los pedidos para comprar
    const download = async () => {
    let downloadprinters;
    
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
        let queryparams =  "";
        const data = await ImpresorasService.descargar(queryparams);
        console.log(data);

        downloadprinters=printersexample;
        } catch (error) {
        // setResultados(
        //   { "cod": error.cod, "message": cod.message}
        // );
        }
    }else{
        // downloadprinters=printersexample;
        downloadprinters=printersPruebas;
        // console.log(printersexample);
    }
    setThePrinters(downloadprinters);
    console.log(theprinters);

    setControlPrinters(printersPruebas);
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
        
            <Row>
                <CarritoLista printers={props.controlPrinters.printers} />
            </Row>  
            }
        </div>
    );
}














