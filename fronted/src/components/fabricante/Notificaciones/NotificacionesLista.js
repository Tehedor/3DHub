import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerNotificacion from "./VerNotificacion";

export default function NotificacionesLista(props) {
    let lista = props.pedidos;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                        <VerNotificacion pedidos={items}/>
                  
                ))}
        </div>);
}
