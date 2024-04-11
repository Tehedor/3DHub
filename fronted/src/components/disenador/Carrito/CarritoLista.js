import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import VerPedidoCarrito from "./VerPedidoCarrito";

export default function CarritoLista(props) {
    let lista = props.theCarrito;    



    
//     let lista = props.pedidos;    
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
                {  Array.isArray(lista) && lista.length > 0 &&
                    lista.map((items,index) => (
                    items.status === "KART" && 
                        <VerPedidoCarrito carrito={items} printer={searchPrinter(items.printer_id)} fabricante={searchFabricante(items.printer_id)}/>
                ))}
        </div>);
}
