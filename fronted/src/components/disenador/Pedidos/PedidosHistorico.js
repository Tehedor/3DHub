import { Button, Row, Col, Container } from "react-bootstrap";

import PedidosLista from './PedidosLista';

// Tabla de estados
import TablaEstados from '../../../common/Tabla_estados.js';

export default function PedidosHistorico(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos descargados
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const thePedidos = props.pedidos;
    const thePrinters = props.printers;
    const theFabricantes = props.fabricantes;
    const theReseñas = props.reseñas;
    console.log(theReseñas)

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <div>
            <Container>

                <h2 id="AllPedidos">Todos los pedidos</h2>
                <Container>
                    <Row>

                        <Col sm={2}>
                            <TablaEstados />
                            <Button id="volver" variant="primary" href="/">Volver</Button>
                        </Col>

                        <Col sm={10}>
                            <Row>
                                <PedidosLista pedidos={thePedidos} printers={thePrinters} fabricantes={theFabricantes} reseñas={theReseñas} />
                            </Row>
                        </Col>

                    </Row>
                </Container>

            </Container>
        </div>
    );
}














