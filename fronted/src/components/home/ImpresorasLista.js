import {Link} from "react-router-dom";
import VerPedir from "./VerPedir";

export default function ImpresorasLista(props) {
    let lista = props.printers;    
    console.log(lista);


    let ratings = props.ratings;

   return(
        <div id="productosresultados" >
                {lista.map((items,index) => (
                    <Link to={`/pedirpedido/${index}`} style={{ textDecoration: 'none' }}>
                        <VerPedir printer={items} ratings={ratings} />
                    </Link>
                ))}
        </div>);
}
