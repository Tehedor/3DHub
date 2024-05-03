import {Card,Row, Col, Button} from "react-bootstrap";

import "./pasarelapago/PasarelaDePago.css";

// Apis
import CarritoService from "../../../services/diseñador/carrito.service";

export default function VerPedidoCarrito(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const carrito = props.carrito;
    const printer = props.printer;
    const fabricante = props.fabricante;
    
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Función eliminar pedido
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const eliminarPedido = () => { 
        console.log("Eliminando pedido");
        console.log(carrito.id);
        CarritoService.deletePedido(carrito.id);
    }


    // const total = carrito.price + carrito.deliveryPrice;
    const total = 35;
    
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    return(


        <Row>
            <Col lg={7} xs={8} className="mt-4 line pl-4">
                <h2 className="bill-head">Pedido_ID: {carrito.id} </h2>
                <small className="bill-date">Fabricación: {carrito.manufacturerDate}</small>
                <small className="bill-date">Envio: {carrito.deliveryDate} </small>
            </Col>
            <Col lg={5} xs={4} className="mt-4">
                <smallh2 className="bill-head px-xl-5 px-lg-4">Precio: </smallh2>
                <small className="bill-head px-xl-5 px-lg-4">Envio: </small>
                <small className="bill-head px-xl-5 px-lg-4"><strong>Total:</strong> </small>
            </Col>
        </Row>

    );
 
}


// Nombre_modelo": "Elegoo Saturn",
//       "Ubicación_imp": "Taller",
//       "Tipo_impresora": "SLA",
//       "Foto_impresora": "https://www.prusa3d.com/content/images/product/default/224.jpg",
//       "Precio_servicio": 0.26,
//       "Unidades_max": 1,
//       "Velo_fabricacion": 60,
//       "Max_ancho": 219,
//       "Max_alto": 120,
//       "Precision": 50,
//       "Colores_disponibles": ["Gris", "Negro"],
//       "Acabados_disponibles": ["Mate"],
//       "Fabricante": "Elegoo"