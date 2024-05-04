import VerPedidoCarrito from "./VerPedidoCarrito";

export default function CarritoLista(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    let lista = props.theCarrito;    
    let fabricantes = props.fabricantes;
    let printers = props.printers;
    
    console.log("lista",lista);
    console.log("printers",printers);
    console.log("fabricantes",fabricantes);
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funcoienes de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
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
        const idFabricante = printer.idFabricante;
        console.log(idFabricante);
        for (let i = 0; i < fabricantes.length; i++) {
            if (fabricantes[i].id == idFabricante) {
                console.log(fabricantes[i]);
                return fabricantes[i];
            }
        }
    }       
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return(
        <div id="productosresultados" >
            {
            Array.isArray(lista) && lista.length > 0 ? (
                lista.map((items, index) =>
                    items.status === "KART" ? (
                        <VerPedidoCarrito
                            carrito={items}
                            printer={searchPrinter(items.printer_id)}
                            fabricante={searchFabricante(items.printer_id)}
                        />
                    ) : null
                    )
            ) : (
                <p>El carrito está vacío</p>
            )
            }
        </div>);
}
