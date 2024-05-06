import { useParams, useLocation } from "react-router-dom";
// import Ver from "./Ver";
import ImpresorasVista from "./ImpresorasVista";

export default function LocationImpresora(props) {
	let { printerId } = useParams();
	// let { productId } = useParams();	

	const location = useLocation();

	// console.log(props.controlPrinters);
	// console.log(props.controlRatings);
	// console.log(props.controlFabricantes);
	console.log(props.theprinters);
	console.log(props.theratings);
	console.log(props.theFabricantes);
	// console.log(props.controlUsuario);

	return (
		<div>
			{/* <PedirPedido printers={props.controlPrinters} printerId={printerId} ratings={props.controlRatings} cambioRoll={props.cambioRoll} controlFabricantes={props.controlFabricantes} /> */}

			{/* <ImpresorasVista
				printerId={printerId} 
				printers={props.theprinters} ratings={props.theratings} controlFabricantes={props.theFabricantes}

			/> */}

			<ImpresorasVista
				printerId={printerId} 
				printers={props.controlPrinters} ratings={props.controlRatings} controlFabricantes={props.controlFabricantes}
				// controlPrinters={controlPrinters} controlRatings={controlRatings} controlFabricantes={controlFabricantes}
			/>

			{/* <PedirPedido printers={props.theprinters} printerId={printerId} ratings={props.theratings} cambioRoll={props.cambioRoll} controlFabricantes={props.theFabricantes}/> */}
		</div>
	);
}