import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerImpresora from "./VerImpresora";

export default function TodasImpresorasLista(props) {
    let lista = props.printers;    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                        <VerImpresora printer={items}/>   
                ))}
        </div>);
}
