// import VerPedidoCarrito from "./VerPasarelaPago";
import VerPasarelaPago from "./VerPasarelaPago";

export default function CarritoLista(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    let lista = props.theCarrito;    
    console.log("lista",lista);
    let fabricantes = props.theFabricantes;
    console.log("fabricantes",fabricantes);
    let printers = props.thePrinters;
    console.log("printers",printers);
    
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funcoienes de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const searchPrinter = (id) => {
        // for (let i = 0; i < printers.length; i++) {
        for (let i = 0; i < 1; i++) {
            console.log(printers[i].id);
            if (printers[i].id == id) {
                console.log(printers[i]);
                return printers[i];
            }
        }
    }
    
    const searchFabricante = (id) => {
        const printer = searchPrinter(id);
        // const idFabricante = printer.idFabricante;
        // console.log("idFabricante", idFabricante);
        // for (let i = 0; i < fabricantes.length; i++) {
        //     if (fabricantes[i].id == printer.idFabricante) {
        //     }
        // }
        // return null;
        return fabricantes[0];
    }       
    
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return(
        <div id="productosresultados">
            {
            Array.isArray(lista) && lista.length > 0 ? (
                lista.map((items, index) =>
                    items.status === "KART" ? (
                        // <h1>h</h1>
                        <VerPasarelaPago
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
