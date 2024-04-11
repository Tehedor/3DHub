import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerNotificacion from "./VerNotificacion";

export default function NotificacionesLista(props) {
    
    let lista = props.pedidos;    
    let diseñadores = props.diseñadores;
    let printers = props.printers;
    
    console.log("lista",lista);
    console.log("printers",printers);
    console.log("diseñador",diseñadores);

    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
            console.log(printers[i].id);
            if (printers[i].id == id) {
                return printers[i];
            }
        }
    }

    const searchDiseñador = (id) => {
        for (let i = 0; i < diseñadores.length; i++) {
            if (diseñadores[i].id == id) {
                return diseñadores[i];
            }
        }

    }
    

   return(
        <div id="productosresultados" >
                { Array.isArray(lista) && lista.length > 0 &&lista.map((items,index) => (
                             items.status !== "KART" && 
                        <VerNotificacion pedidos={items} printer={searchPrinter(items.printer_id)} diseñador={searchDiseñador(items.user_id)}/>
                  
                ))}
        </div>);
}
