import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPediros from "./VerPediros";

export default function PedidosLista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerPediros printer={items}/>
                    </Link>
                ))}
        </div>);
}
