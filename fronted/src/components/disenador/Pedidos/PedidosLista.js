import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPediros from "./VerPedidos";

export default function PedidosLista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
        
                    <VerPediros printer={items}/>
               
                ))}
        </div>);
}
