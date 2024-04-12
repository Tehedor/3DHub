import {useParams, useLocation} from "react-router-dom";
// import Ver from "./Ver";
import PedirPedido from "./PedirPedido";

export default function Location(props) {
  	let { printerId } = useParams();	
  	// let { productId } = useParams();	
	
	const location = useLocation(); 
	
    console.log(props.controlPrinters)

	return (
		<div> 
			<PedirPedido  printers={props.controlPrinters} printerId={printerId}/>
		</div>);
}