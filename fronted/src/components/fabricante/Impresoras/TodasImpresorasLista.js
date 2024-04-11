import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerImpresora from "./VerImpresora";

export default function TodasImpresorasLista(props) {
    let lista = props.printers;    

    return(
        <div id="productosresultados" >
            { Array.isArray(lista) && lista.length > 0 &&
                lista.map((items,index) => (
                    <VerImpresora printer={items}/>
                ))
            }
        </div>
    );
}