import VerImpresora from "./VerImpresora";
import { Link } from 'react-router-dom';

export default function TodasImpresorasLista(props) {

    let lista = props.printers;

    return (
        <div id="productosresultados" >

            {Array.isArray(lista) && lista.length > 0 &&
                lista.map((items, index) => (
                    // ##### ##### ##### ##### ##### ##### #####
                    // ##### ##### ##### ##### ##### ##### #####

                    <Link to={`/impresoravista/${items.id}`} style={{ textDecoration: 'none' }}>
                        {/* <VerPedir printer={items} ratings={ratings} fabricantes={searchFabricante(items.id)} /> */}
                        <VerImpresora printer={items} />
                    </Link>
                ))
            }

        </div>
    );
}