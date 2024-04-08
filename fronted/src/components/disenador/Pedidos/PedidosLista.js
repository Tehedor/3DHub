import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPedidos from "./VerPedidos";

export default function PedidosLista(props) {
    let lista = props.pedidos;    
    let fabricantes = props.fabricantes;
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

    const searchFabricante = (id) => {
        const printer = searchPrinter(id);
        const idFabricante = printer.userIdFabricante;
        for (let i = 0; i < fabricantes.length; i++) {
            if (fabricantes[i].id == id) {
                return fabricantes[i];
            }
        }

    }
    


   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    items.status !== "KART" && 
                    <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)} fabricante={searchFabricante(items.printer_id)} />
                ))}
        </div>);
}
