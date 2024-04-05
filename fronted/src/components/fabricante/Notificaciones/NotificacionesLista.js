import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerNotificacion from "./VerNotificacion";

export default function NotificacionesLista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerNotificacion printer={items}/>
                    </Link>
                ))}
        </div>);
}
