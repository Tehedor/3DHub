import { Button , Row, Col, InputGroup, Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import {useGeolocated} from "react-geolocated";
import ImpresorasLista from './ImpresorasLista';
import CONFIG from '../../config/config.js';
import {printersexample} from '../../constants/printers.js';

// Pruebas de la impresora para las vistas
import {printersPruebas} from '../../constants/printersPruebas.js';

import ImpresorasService from "../../services/imprsoras.service";


const SERVER_URL = CONFIG.server_url;
export default function Home(props) {
    // Controlador de impresoras para que funcione el Location
    const setControlPrinters = props.setControlPrinters;

    const [query, setQuery] = useState("");
    // const [printers, setprinters] = useState("");
    // const [printers, setprinters] = useState(props.theprinters);

    // Contenido de la barra de ubicación
    const [queryUbica, setQueryUbica] = useState("");
  
    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [theprinters, setThePrinters] = useState();


    // Localizacion usuario
    // https://www.npmjs.com/package/react-geolocated?activeTab=readme
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

  
    // Función que descarga las impresoras, en función de la localización en la que se encuentra
    const download = async () => {
    let downloadprinters;
    // Coordenadas de Madrid para que sean por defecto 
    const latitude=40.4167;
    const longitude=-3.70325;  

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
                <ImpresorasLista printers={props.controlPrinters.printers} />
            </Row>  
            }
        </div>
    );
}














