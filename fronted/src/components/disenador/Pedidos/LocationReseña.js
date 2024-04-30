import {useParams, useLocation} from "react-router-dom";

import {Col, Row} from "react-bootstrap";

import AñadirReseña from "./AñadirReseña";
import VerPedidos from "./VerPedidos";


export default function LocationReseña(props) {
  	let { pedidosId } = useParams();	
  	// let { productId } = useParams();	
	const location = useLocation(); 
	
	// ##### ##### ##### ##### ##### ##### ##### #####
	// ##### ##### Datos descargados
	// ##### ##### ##### ##### ##### ##### ##### #####
	const pedidos = props.pedidos;
	const printers = props.printers;
	const fabricante = props.fabricante;
	const reseñas = props.reseñas;
	
	
	// ##### ##### ##### ##### ##### ##### ##### #####
	// ##### ##### Funciones de busqueda
	// ##### ##### ##### ##### ##### ##### ##### #####
	const searchPrinter = (id) => {
		console.log(id)
        for (let i = 0; i < printers.length; i++) {
			if (printers[i].id == id) {
				return printers[i];
            }
        }
    }
	
	const searchPedido = (id) => {
		for (let i = 0; i < pedidos.length; i++) {

			if (pedidos[i].id == id) {
				return pedidos[i];
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
	
	// ##### ##### ##### ##### ##### ##### ##### #####
	// ##### ##### retruns
	// ##### ##### ##### ##### ##### ##### ##### #####
	return (
		<div> 
			<Col>

				<Row  className="justify-content-center">
					<h1>Añadir Reseña</h1>	
				</Row>
				
				<Row  className="justify-content-center">
					<VerPedidos pedidos={searchPedido(pedidosId)} printer={searchPrinter(searchPedido(pedidosId).printer_id)} thecontrol={false} reseña={searchReseña(pedidosId)} />
				</Row>

				<Row  className="justify-content-center"> 
					<AñadirReseña  pedidos={pedidos} pedidosId={pedidosId}/>
				</Row>
			
			</Col>
		</div>
		);
}

