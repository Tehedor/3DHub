import { Link } from "react-router-dom";
import VerPedir from "./VerPedir";

export default function ImpresorasLista(props) {
    let lista = props.printers ? props.printers : [];
    console.log(lista);


    let ratings = props.ratings;
    let fabricantes = props.theFabricantes;

        // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Funciones de busqueda
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const searchPrinter = (id) => {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == id) {
                return lista[i];
            }
        }
    }

    const searchReseña = (id) => {
        if (reseñas !== undefined) {
            for (let i = 0; i < reseñas.length; i++) {
                if (reseñas.id == id) {
                    return reseñas[i];
                }
            }
        }
        return false;
    }


    const searchFabricante = (id) => {
        const printer = searchPrinter(id);
        const idFabricante = printer.idFabricante;
        for (let i = 0; i < fabricantes.length; i++) {
            console.log(fabricantes[i]);
            if (fabricantes[i].id == idFabricante) {
                console.log(fabricantes[i]);
                return fabricantes[i];
            }
        }
    }
    console.log(lista);

    return (
        <div id="productosresultados" >
            {lista.length > 0 ? (
                lista.map((items, index) => (
                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerPedir printer={items} ratings={ratings} fabricantes={searchFabricante(items.id)} />
                    </Link>
                ))
            ) : (
                <p>No hay impresoras disponibles.</p>
            )}
        </div>
    );
}
