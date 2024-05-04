import React, { useState, useEffect } from "react";

// import VerPedidoCarrito from "./VerPasarelaPago";
import VerReseña from "./VerReseña";

export default function ReseñaLista(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Datos de descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const printer = props.printer;
    // const printers = props.printers;    
    const fabricantes = props.fabricantes;
    console.log(fabricantes);

    // const printer = props.printer;
    console.log(printer);
    const allratings = props.ratings ? props.ratings : [];

    console.log(allratings);

    // ...

    const [printerRating, setPrinterRating] = useState([]);
    const [manufacturerRatingAll, setManufacturerRatingAll] = useState(0);
    const [productRatingAll, setProductRatingAll] = useState(0);

    useEffect(() => {
        // const allratings = props.ratings;
        const allratings = props.ratings ? props.ratings : [];

        let tempManufacturerRatingAll = 0;
        let tempProductRatingAll = 0;
        let tempPrinterRating = [];

        for (let i = 0; i < allratings.length; i++) {
            console.log(allratings[i].printer_id);
            if (allratings[i].printer_id === printer.id) {
                tempManufacturerRatingAll += allratings[i].manufacturerRating;
                tempProductRatingAll += allratings[i].productRating;
                // tempPrinterRating = allratings[i].rating;
                tempPrinterRating.push(allratings[i]);
                console.log(tempPrinterRating);
            }
        }

        setManufacturerRatingAll(tempManufacturerRatingAll);
        setProductRatingAll(tempProductRatingAll);
        setPrinterRating(tempPrinterRating);
    }, [props.ratings]); // Dependencias para que se ejecute cada vez que cambien las propiedades

    const manufacturerRating = printerRating.length > 0 ? manufacturerRatingAll / printerRating.length : 0;
    console.log(manufacturerRating);
    const productRating = printerRating.length > 0 ? productRatingAll / printerRating.length : 0;
    console.log(productRating);


    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funcoienes de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const searchPrinter = (id) => {
        // for (let i = 0; i < printers.length; i++) {
        for (let i = 0; i < 1; i++) {
            console.log(printers[i].id);
            if (printers[i].id == id) {
                return printers[i];
            }
        }
    }

    const searchFabricante = (id) => {
        // const printer = searchPrinter(id);
        const idFabricante = printer.userIdFabricante;
        for (let i = 0; i < fabricantes.length; i++) {
            if (fabricantes[i].id == idFabricante) {
                return fabricantes[i];
            }
        }
    }

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (
        <div id="productosresultados">
            {
                printerRating.length > 0 ? (
                    printerRating.map((items, index) => (
                            <VerReseña printerRating={items} printer={printer} fabricantesName={searchFabricante(items.id)}/>
                        
                    ))
                ) : (
                    <p>No hay reseñas todavia</p>
                )
            }
        </div>
    );
}
