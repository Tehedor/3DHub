import { Button , Row, Col, InputGroup, Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import Lista from './ImpresorasLista';
import CONFIG from './config/config';

export default function SearchPage(props) {
    const [query, setQuery] = useState("");
    const [printers, setprinters] = useState(props.theprinters);
    

//       // Función que descarga las impresoras, en función de la localización en la que se encuentra
//   const download = async () => {
//     let downloadprinters;
//     // Coordenadas de Madrid para que sean por defecto 
//     const latitude=40.4167;
//     const longitude=-3.70325;  

//     // Poner la manerad para solicitar las impresoras en función de la localizaciónSs
//     if(CONFIG.use_server){
//       try {
//         if(props.isGeolocationEnabled || !props.queryUbica===""){
//           if (!props.queryUbica===""){
//             // api que me permita sacar latitud y longitud de la ubicación a partir de la query 
//           }else{
//             latitude=props.coords.latitude;
//             longitude=props.coords.longitude;
//           }
//         }
//         let queryparams =  "?lat=" + latitude + "&lon=" + longitude;
//         const response = await fetch(`${SERVER_URL}${queryparams}`);
//         const data = await response.json();         
//         downloadprinters = data;
//       } catch (error) {
//         // setResultados(
//         //   { "cod": error.cod, "message": cod.message}
//         // );
//       }
//     }else{
//       downloadprinters=printersexample;
//     }
//     setThePrinters(downloadprinters);
//   }

//   // Efecto que se ejecuta al cargar la página
//   useEffect(() => {
//     setLoading(true);
//       async function fetchData() {
//         await download();
//        setTimeout(()=>{
//           setLoading(false);
//         },800);		
//     }
//     fetchData();
//   }, []);


    return (
        <div>
            <h2 id="catálogo">impresoras</h2> 
            {/* <Row>
                <Col> 
                    <h5>Buscar</h5>
                    <Row>
                        <InputGroup style={{width: "80%",  margin: '0 auto'}} >
                            <Form.Control id='filtro' type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        </InputGroup>   
                    </Row>
                    <Row>
                        <Button id="buscador" variant="secondary"  onClick={filter} style={{width: "100px",  margin: '0 auto',marginTop: '5px'}} >Buscador</Button>{' '}
                    </Row>
                    </Col>
                <Col>
                    <Filtrar categorias={categ} setprinters={setprinters} theprinters={props.theprinters} /> 
                </Col>
            </Row> */}
            <Row>
                <Lista printers={printers} />
            </Row>   
        </div>
    );
}
