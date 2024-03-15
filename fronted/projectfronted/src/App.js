import './App.css';
import CONFIG from './config/config.js';


// Componenetes vistas de react
import NavBar from './NavBar';
import SearchPrinter from './SearchPrinter.js';
import Location from './Location';

import DisenadorLogin from './disenador/DisenadorLogin.js';
import DisenadorRegistrar from './disenador/DisenadorRegistrar.js';
import FabricanteLogin from './fabricante/FabricanteLogin.js';
import FabricanteRegistrar from './fabricante/FabricanteRegistrar.js';

import Pedidos from './disenador/Pedidos.js';
import PedidoVer from './disenador/PedidoVer.js';
import MyImpresoras from './fabricante/MyImpresoras.js';
import MyImpresoraVer from './fabricante/MyImpresoraVer.js';
import Carrito from './disenador/Carrito.js';
import Notificaciones from './fabricante/Notificaciones.js';

import Error from './Error';
import FooterSection from './FooterSection';

// Dependencias externas
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGeolocated} from "react-geolocated";


// Funcionalidades de react
import { useState, useEffect } from 'react';
import { BrowserRouter,Route, Routes, Navigation } from 'react-router-dom';
// import {Route, Routes, Navigation } from 'react-router-dom';

// Importar json de pruebas para el fronted
import {printersexample} from './constants/printers';


// Pruebas, habrá que ajustarlo para mandar la infomación desde el backend
const SERVER_URL = CONFIG.server_url;

function App() {

  // Estado en el que se alamcenan las impresoras
  const [theprinters, setThePrinters] = useState();

  // Estado en el que muestra el spinner si esta cargando
  const [loading, setLoading] = useState(true);
 
  // Estado para el login del diseañdor
  const [loginDiseñador, setLoginDiseñador] = useState(false);
  
  // Estado para el login del fabricante
  const [loginFabricante, setLoginFabricante] = useState(false);

  // Control de Roll
  const [roll, setRoll] = useState("");
  // const [roll, setRoll] = useState(null);

  // Variable que guara la localización en la que se encuentra el diseñdor
  const [ubicacion, setubicacion] = useState("Madrid");

  // Contenido de la barra de busqueda
  const [query, setQuery] = useState("");

  // Contenido de la barra de ubicación
  const [queryUbica, setQueryUbica] = useState("");
  
  // Contenido del carrito de la compra
  const [thecarrito, setTheCarrito] = useState({carrito:[]});//[{"id":1,"nombre":"Impresora 3D","precio":100,"cantidad":1,"total":100}

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
        if(isGeolocationEnabled || !queryUbica===""){
          if (!queryUbica===""){
            // api que me permita sacar latitud y longitud de la ubicación a partir de la query 
          }else{
            latitude=coords.latitude;
            longitude=coords.longitude;
          }
        }
        let queryparams =  "?lat=" + latitude + "&lon=" + longitude;
        const response = await fetch(`${SERVER_URL}${queryparams}`);
        const data = await response.json();         
        downloadprinters = data;
      } catch (error) {
        // setResultados(
        //   { "cod": error.cod, "message": cod.message}
        // );
      }
    }else{
      downloadprinters=printersexample;
    }
    setThePrinters(downloadprinters);
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
    <body>
    <BrowserRouter>
      <div className="App">
        {/* <Header/> */}
        <NavBar roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica}/>
        {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/cxyduck.gif"} className="spinner" alt="spinner" />:
          <Routes>
            {/* <Route path="/searchprinter" element={<SearchPrinter isGeolocationEnabled theprinters={theprinters.printers} setThePrinters={setThePrinters} />} /> */}
            <Route path="/" element={<SearchPrinter theprinters={theprinters.printers} setThePrinters={setThePrinters} />} />
            <Route path="/printers/:printerId" element={<Location theprinters={theprinters.printers}/>}/> 
      
            <Route path="/loginFabricante" element={<FabricanteLogin setRoll={setRoll} />}/> 
            <Route path="/registrarFabricante" element={<FabricanteRegistrar />}/> 
            <Route path="/loginDisenador" element={<DisenadorLogin setRoll={setRoll} />}/> 
            <Route path="/registrarDisenador" element={<DisenadorRegistrar />}/> 

            <Route path="/pedidos" element={<Pedidos />}/> 
            <Route path="/pedidos/:pedidosId" element={<PedidoVer />}/> 
            
            <Route path="/myprinters" element={<MyImpresoras />}/> 
            <Route path="/myprinters/:printerId" element={<MyImpresoraVer />}/> 

            <Route path="/notificaciones" element={<Notificaciones />}/> 

            <Route path="/carrito" element={<Carrito thecarrito={thecarrito.carrito}/>}/> 

            <Route path="/*" element={<Error/>}/>
          </Routes>
        }
         
        
      </div>
      <footer>
        <FooterSection/>
      </footer>
            
    </BrowserRouter>
    </body>
  ); 
}

export default App;
