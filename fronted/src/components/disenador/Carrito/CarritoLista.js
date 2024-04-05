import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerPedidoCarrito from "./VerPedidoCarrito";

export default function CarritoLista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerPedidoCarrito printer={items}/>
                    </Link>
                ))}
        </div>);
}
