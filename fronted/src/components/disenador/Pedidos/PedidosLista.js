import { Card, Button , Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerPedidos from "./VerPedidos";

export default function PedidosLista(props) {
    let lista = props.pedidos;    
    let fabricantes = props.fabricantes;
    let printers = props.printers;
    
    let reseñas = props.reseñas;

    // console.log("lista",lista);
    // console.log("printers",printers);
    // console.log("fabricantes",fabricantes);

    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
        // for (let i = 0; i < props.printers.length; i++) {
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
    
    const searchReseña = (id) => {
		if (reseñas !== undefined){
			for (let i=0; i < reseñas.length; i++ ) {
				if (reseñas.id == id) {
					return reseñas[i];
				}
			}
		}
		return false;
	}


   return(
        <div id="productosresultados" >
                { Array.isArray(lista) && lista.length > 0 &&lista.map((items,index) => (
                    items.status !== "KART" && 
                    // <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)} fabricante={searchFabricante(items.printer_id)} />
                    <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)} reseña={searchReseña(items.id)}/>
                ))}
        </div>);
}
