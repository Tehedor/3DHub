import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerNotificacion from "./VerNotificacion";

export default function NotificacionesLista(props) {
    
    let lista = props.pedidos;    
    let diseñador = props.diseñador;
    let printers = props.printers;
    
    console.log("lista",lista);
    console.log("printers",printers);
    console.log("fabricantes",fabricantes);

    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
            console.log(printers[i].id);
            if (printers[i].id == id) {
                return printers[i];
            }
        }
    }

    const searchDiseñador = (id) => {ç
        for (let i = 0; i < diseñador.length; i++) {
            if (fabricantes[i].id == id) {
                return fabricantes[i];
            }
        }

    }
    

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                             items.status !== "KART" && 
                        <VerNotificacion pedidos={items} printer={searchPrinter(items.idImpresora)} diseñador={searchDiseñador(items.IdDisñador)}/>
                  
                ))}
        </div>);
}
