import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import ImpresorasLista from './ImpresorasLista';

// Pruebas de la impresora para las vistas
import { printersexample } from '../../constants/printersPruebas.js';
import { printersPruebas } from '../../constants/printersPruebas.js';

import ImpresorasService from "../../services/impresoras.service.js";

import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from "react-geocode";

setDefaults({
    key: "AIzaSyBpo1XjPia4u_NUHO60g8kILg9vgZb9AP0", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
});


export default function Home(props) {

    // Controlador de impresoras para que funcione el Location
    // const setControlPrinters = props.setControlPrinters;

    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);

    // Estado en el que se alamcenan las impresoras
    const theprinters = props.theprinters;
    const setThePrinters = (a) => {
        props.setThePrinters(a);
    }

    const theratings = props.theratings;
    const setTheRatings = (a) => {
        props.setTheRatings(a);
    }

    const theFabricantes = props.theFabricantes;
    const setTheFabricantes = (a) => {
        props.setTheFabricantes(a);
    }


    // const [theprinters, setThePrinters] = useState([]);
    // const [theratings, setTheRatings] = useState();
    // const [theFabricantes, setTheFabricantes] = useState();

    // ###### ###### ###### ###### ###### ###### ###### ###### ######
    // ###### ###### ###### Geolocalización
    // ###### ###### ###### ###### ###### ###### ###### ###### ######

    // Localizacion usuario
    // https://www.npmjs.com/package/react-geolocated?activeTab=readme
    // const [latitude, setLatitude] = useState(0);
    // const [longitude, setLongitude] = useState(0);


    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    const latitud = coords ? coords.latitude : "0";
    const longitud = coords ? coords.longitude : "0";


    console.log(!(localStorage.getItem("actualLocation")))
    if (isGeolocationAvailable && isGeolocationEnabled && !(localStorage.getItem("actualLocation"))) {

        console.log(longitud);
        console.log(latitud);

        if (latitud !== "0" && longitud !== "0") {

            geocode(RequestType.LATLNG, `${latitud},${longitud}`)
                .then(({ results }) => {
                    const address = results[0].formatted_address;
                    localStorage.setItem("actualLocation", address);
                    console.log(address);
                })
                .catch(console.error);
            // localStorage.setItem("actualLocation", "3Q9H+MF Yanguas de Eresma, Spain");
        }


    }
    console.log((localStorage.getItem("actualLocation")));



    // ###### ###### ###### ###### ###### ###### ###### ###### ######
    // ###### ###### ###### dowload versioón 1
    // ###### ###### ###### ###### ###### ###### ###### ###### ######


    // useEffect(() => {
    //     props.setTheControDom(false);
    //     console.log("pruebas")
    //     // Aquí va el código que quieres ejecutar cuando el valor de file cambia
    // }, [props.theControlDom]);

    // props.setTheControDom(false);

    const download = async () => {
        console.log(props.theControlDom);
        let downloadprinters;
        let dowloadratings;
        let downloadfabricantes;

        try {
            console.log(props.printerType, props.maxUnities, props.material, props.color);

            let response;
            console.log(props.theFiltrarOn);
            console.log(props.theLocationOn);
            if (props.theFiltrarOn === true) {
                response = (await ImpresorasService.descargarPrintersFiltred(props.printerType, props.maxUnities, props.material, props.color)).data;
                console.log(response);
            } else if (props.theLocationOn === true) {
                console.log("buensa");
                console.log(props.theFilLocation);
                response = (await ImpresorasService.descargarPrintersNear(props.theFilLocation)).data;
                console.log(response);
            } else {
                response = (await ImpresorasService.descargarPrinters()).data;
                console.log(response);
            }

            if (JSON.parse(localStorage.getItem("user"))) {
                await ImpresorasService.getDescargarUsuario();
                console.log(JSON.parse(localStorage.getItem("usuarioDescargado")));
            }

            console.log(response);
            downloadprinters = response.printers;
            console.log(downloadprinters);
            dowloadratings = response.ratings;
            console.log(dowloadratings);
            setThePrinters(downloadprinters);
            props.setControlPrinters(downloadprinters);
            console.log(theprinters);
            downloadfabricantes = response.users;
            console.log(downloadfabricantes);
            setTheFabricantes(downloadfabricantes);
            props.setControlFabricantes(downloadfabricantes);
            // props.setTheControDom(false);

            setTheRatings(dowloadratings);
            props.setControlRatings(dowloadratings);

        } catch (error) {
            // setResultados(
            // { "cod": error.cod, "message": cod.message}
            // );
        }
    }


    // Efecto que se ejecuta al cargar la página
    useEffect(() => {
        setLoading(true);
        async function fetchData() {

            await download();

            setLoading(false);
            // setTimeout(()=>{
            //     setLoading(false);
            // },800);      
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (props.theFiltrarOn) {
            setLoading(true);
            async function fetchData() {

                await download();

                setLoading(false);
                // setTimeout(()=>{
                //     setLoading(false);
                // },800);      
            }
            fetchData();
            // setTheFiltrarOn(false);
            props.setTheFiltrarOn(false);
        }
    }, [props.theFiltrarOn]);

    useEffect(() => {
        console.log(props.theLocationOn);
        if (props.theLocationOn) {
            setLoading(true);
            async function fetchData() {

                await download();

                setLoading(false);
                // setTimeout(()=>{
                //     setLoading(false);
                // },800);      
            }
            fetchData();
            // setTheFiltrarOn(false);
            props.setLocationOn(false);
        }
    }, [props.theLocationOn]);


    return (
        <div>
            <h2 id="catálogo">impresoras</h2>
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" /> :
                <Row>
                    <ImpresorasLista
                        printers={theprinters} ratings={theratings} theFabricantes={theFabricantes}
                    />
                </Row>
            }
        </div>
    );
}














