import { Card, Row, Col, Button, Container } from "react-bootstrap";
import StarRatings from 'react-star-ratings';


// import "./pasarelapago/PasarelaDePago.css";

// Apis
// import CarritoService from "../../../services/diseñador/carrito.service";

export default function VerReseña(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables de Reseña
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    const printerRating = props.printerRating;

    const fabricantesName = props.fabricantesName;
    const printer = props.printer;

    console.log(printerRating.productRating);
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### #####
    return (

        <Container>
            <Row className="d-flex justify-content-center align-items-center" >

                <Col lg={8} style={{ marginBottom: '20px', border: '3px solid lightgray' }} >
                    <Row>

                        <Col lg={6}>
                            <small >Pedido_ID: {printer.id}, NombrePrinter: {printer.modelName},
                                <StarRatings
                                    // rating={props.ratingProducto}
                                    rating={printerRating.productRating ? printerRating.productRating : 0}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='ratingProducto'
                                    starDimension="20px"
                                    starSpacing="0px"
                                />
                            </small>
                        </Col>
                        <Col lg={6}>
                            <small>Id_Fabricante: {printer.userIdFabricante}, Fabricante: {fabricantesName}</small>
                            <StarRatings
                                // rating={props.ratingProducto}
                                rating={printerRating.manufacturerRating ? printerRating.manufacturerRating : 0}
                                starRatedColor="red"
                                numberOfStars={5}
                                name='ratingProducto'
                                starDimension="20px"
                                starSpacing="0px"
                            />
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: 'flex-start' }}>
                        <small>Fecha: {new Date(printerRating.date).toLocaleDateString('es-ES')}</small>
                    </Row>
                    <Row style={{ paddingBottom: '10px' }}>
                            <Col xs={8}>
                                <Container style={{ marginLeft: '5px' }}>
                                    <small>Comentario: {printerRating.textRating}</small>
                                </Container>
                            </Col>
                        <Col xs={2}>
                            <div style={{ width: '150px', height: '150px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {printerRating.urlPhoto ?
                                    <img src={printerRating.urlPhoto} alt="imagen" style={{ width: '140px', height: '140px' }} />
                                    :
                                    <div style={{ width: '140px', height: '140px', backgroundColor: 'white' }}></div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    );

}


// Nombre_modelo": "Elegoo Saturn",
//       "Ubicación_imp": "Taller",
//       "Tipo_impresora": "SLA",
//       "Foto_impresora": "https://www.prusa3d.com/content/images/product/default/224.jpg",
//       "Precio_servicio": 0.26,
//       "Unidades_max": 1,
//       "Velo_fabricacion": 60,
//       "Max_ancho": 219,
//       "Max_alto": 120,
//       "Precision": 50,
//       "Colores_disponibles": ["Gris", "Negro"],
//       "Acabados_disponibles": ["Mate"],
//       "Fabricante": "Elegoo"