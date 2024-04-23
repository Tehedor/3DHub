import VerPedidos from "./VerPedidos";

export default function PedidosLista(props) {
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos descargados
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    let lista = props.pedidos;    
    let fabricantes = props.fabricantes;
    let printers = props.printers;
    let reseñas = props.reseñas;
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const searchPrinter = (id) => {
        for (let i = 0; i < printers.length; i++) {
            if (printers[i].id == id) {
                return printers[i];
            }
        }
    }
    
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
    
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
   return(
        <div id="productosresultados" >
                { Array.isArray(lista) && lista.length > 0 &&lista.map((items,index) => (
                    items.status !== "KART" && 

                        <VerPedidos pedidos={items} printer={searchPrinter(items.printer_id)} reseña={searchReseña(items.id)}/>
                
                ))}
        </div>);
}
