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
			{/* <div id="divlocation">Location es: {location.pathname}</div> */}
			{/* {printerId&& <div id="divprinter">printerId es: {Number(printerId)+1 }</div>} */}
			{/* {productId && <div id="divproductid">ProductId es: {productId}</div>} */}
			{/* {productId && <div id="divproductid">ProductId es: {productId}</div>} */}
			<PedirPedido  printers={props.controlPrinters.printers} printerId={printerId}/>
			{/* <PedirPedido printers={props.printers} printerId={printerId}/> */}
			{/* <Ver theproducts={props.theproducts} productId={productId}/> */}
		</div>);
}