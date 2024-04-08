import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPediros from "./VerPedidos";

export default function PedidosLista(props) {
    let lista = props.pedidos;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
        
                    <VerPediros pedidos={items}/>
                ))}
        </div>);
}
