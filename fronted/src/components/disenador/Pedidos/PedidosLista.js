import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPedidos from "./VerPedidos";

export default function PedidosLista(props) {
    let lista = props.pedidos;    
    let fabricantes = props.fabricantes;
    let printers = props.printers;
    
    // console.log("lista",lista);
    // console.log("printers",printers);
    // console.log("fabricantes",fabricantes);

    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
            if (printers[i].id == id) {
                return printers[i];
            }
        }
    }

    // const searchFabricante = (id) => {
    //     const printer = searchPrinter(id);
    //     console.log(printer);
    //     const idFabricante = printer.userIdFabricante;
    //     console.log(idFabricante);
    //     for (let i = 0; i < fabricantes.length; i++) {
    //         if (fabricantes[i].usernmae == idFabricante) {
    //             console.log(fabricantes[i].id,"a", idFabricante);
    //             console.log(fabricantes[i]);
    //             // return fabricantes[i];
    //             return fabricantes[0];
    //         }
    //     }
        
    //     // return fabricantes[0];
    //     return {usernmae: "no encontrado"};
    // }
    


   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    items.status !== "KART" && 
                    // <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)} fabricante={searchFabricante(items.printer_id)} />
                    <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)}/>
                ))}
        </div>);
}
