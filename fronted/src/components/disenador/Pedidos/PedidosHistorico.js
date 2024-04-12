import { Button , Row, Col, InputGroup, Form, Table, Container} from "react-bootstrap";

import PedidosLista from './PedidosLista';


// Apis
// import PedidosService from "../../../services/diseñador/pedidos.service.js";

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';

// Carrito, Pagado, Rechazado, Bajo_revision,Creando, Enviado, Terminado

export default function PedidosHistorico(props) {
   
    // Estado en el que muestra el spinner si esta cargando
    // const [loading, setLoading] = useState(true);
 
    const thePedidos = props.pedidos;

    // pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} 

    const thePrinters = props.printers;
    const theFabricantes = props.fabricantes;
    const theReseñas = props.reseñas;
    
    return (
        <div>


            {/* {loading ? <img id="loading" src={process.env.PUBLIC_URL + "/spinners/cxyduck.gif"} className="spinner" alt="spinner" />: */}
            <Container>
                <h2 id="AllPedidos">Todos los pedidos</h2> 
                <Container>
                    <Row>
                        <Col sm={2}>         
                            <TablaEstados />
                            <Button id="volver" variant="primary"  href="/">Volver</Button>
                        </Col>
                        <Col sm={10}>
                            <Row>
                                <PedidosLista pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} reseñas={theReseñas}/>
                            </Row>  
                        </Col>
                    </Row>
                </Container>

            </Container>
            {/* } */}

        </div>
    );
}














