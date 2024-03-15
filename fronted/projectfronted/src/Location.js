import {useParams, useLocation} from "react-router-dom";
import Ver from "./ImpresorasPedir";

export default function Location(props) {
  	let { productId } = useParams();	
	const location = useLocation(); 
	
	return (
		<div> 
			<div id="divlocation">Location es: {location.pathname}</div>
			{productId && <div id="divproductid">ProductId es: {productId}</div>}
			<Ver theproducts={props.theproducts} productId={productId}/>
		</div>);
}