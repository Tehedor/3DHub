import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPedir from "./VerPedir";

export default function ImpresorasLista(props) {
    let lista = props.printers;    
    console.log(lista);
   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (

                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerPedir printer={items} />
                    </Link>
                ))}
        </div>);
}
