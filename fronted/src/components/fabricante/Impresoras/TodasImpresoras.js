import { useEffect, useState } from "react";

import { Button , Row, Col, Container} from "react-bootstrap";

import TodasImpresorasLista from './TodasImpresorasLista.js';

// Pruebas de la impresora para las vistas
import {printersPruebas} from '../../../constants/impresorasPruebas.js';

// Apis
import ImpresorasServiceFabri from "../../../services/fabricante/impresoras.fabri.service.js";

export default function TodasImpresoras(props) {
    // Estado en el que muestra el spinner si esta cargando
    const [loading, setLoading] = useState(true);
 
     // Estado en el que se alamcenan las impresoras
    const [theprinters, setThePrinters] = useState();

  
    // Función que descarga las impresoras, en función de la localización en la que se encuentra
    const download = async () => {
        let downloadprinters;
        try {
            const response = await ImpresorasServiceFabri.getImpresorasFabricante();
            downloadprinters=response.data;
            console.log(downloadprinters);
        } catch (error) {
            // setResultados(
            // { "cod": error.cod, "message": cod.message}
            // );
        }
        setThePrinters(downloadprinters);
        console.log(theprinters);
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


    return (
        <div>
            <h2 id="catálogo">impresoras Fabricante</h2> 
            
            {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />:
            <Container>
                <Row>
                    
                    <Col md={9}>
                        <TodasImpresorasLista printers={theprinters} />
                    </Col>

                    <Col md={3}>
                        <Row>
                            <Button id="createPriter" variant="success" href="/crearImpresora">Crear Impresora</Button>
                        </Row>
                        <p></p>
                        <p></p>
                        <Row>
                            <Button id="volver" variant="primary" href="/">Volver</Button>
                        </Row>
                    </Col>

                </Row>
            </Container>
            }
            
        </div>
    );
}














