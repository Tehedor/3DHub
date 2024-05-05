import React, { useState, useEffect } from 'react';
import {Container, Card,Row, Col, Image} from "react-bootstrap";

import StarRatings from 'react-star-ratings';

export default function Ver(props) {

    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Variables descarga
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    const printer = props.printer;
    console.log(printer);
    // const printerId = props.printer_id;
    const printerId = printer.id;
    console.log(printerId);
    const fabricantes = props.fabricantes;
    console.log(fabricantes);
    
    


    // productRating
    // const allratings =  props.ratings;
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
            if (allratings[i].printer_id === printerId) {
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

    const manufacturerRating = printerRating.length > 0 ? manufacturerRatingAll/printerRating.length : 0;
    console.log(manufacturerRating);
    const productRating = printerRating.length > 0 ? productRatingAll/printerRating.length : 0;
    console.log(productRating);
    // manufacturerRating



    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    // ##### ##### Return
    // ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
    return(
        <Card border="gray" style={{ backgroundColor: "white", marginTop: '0' }}> 
            <Card.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Row>
                    <Col md={6} lg={3} class="imagen" className="d-flex justify-content-center align-items-center">
                    <Container style={{ width: "100%", height: "auto", overflow: "hidden", boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)" }}>
                        <Image
                        src={printer.urlPhoto || "http://localhost:3000/printer_default.jpg"}
                        style={{ width: "100%", objectFit: "cover" }}
                        thumbnail
                        />
                    </Container>
                    </Col>
                    <Col md={6} lg={9} class="datos_impresora">
                        <Row style={{backgroundColor: "gray"}}>
                        <Col sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Card.Text style={{color: 'black'}}>Nombre: {printer.modelName}</Card.Text>
                        </Col>
                            <Col sm={4}>
                                <Row noGutters>
                                    <Container>
                                    <StarRatings
                                        // rating={props.ratingProducto}
                                        rating={printerRating ? productRating : 0}
                                        starRatedColor="orange"
                                        numberOfStars={5}
                                        name='ratingProducto'
                                        starDimension="20px"
                                        starSpacing="0px"
                                    />
                                    </Container>
                                </Row>
                            </Col>
                            <Col sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Card.Text>Fabricante: <strong>{fabricantes.username}</strong>, Id_impresora: {printer.id}</Card.Text>
                            </Col>
                            

                        </Row>
                        <Row style={{marginTop: "10px"}}>
                            <Col sm={6}>
                                <Card.Text>Tipo: {printer.printerType}</Card.Text>
                                <Card.Text>Max_unid: {printer.maxUnities}</Card.Text>
                                <Card.Text>Velocidad: {printer.manufacturationSpeed} mm³/s</Card.Text>
                                <Card.Text>Max_ancho: {printer.maxWidth} mm</Card.Text>
                                <Card.Text>Max_alto: {printer.maxHeight} mm</Card.Text>
                            
                            </Col>
                            <Col sm={6}>
                                <Card.Text>Precisión: {printer.printerPrecision} mm</Card.Text>
                                <Card.Text>Colores: {printer.color}</Card.Text>
                                <Card.Text>Material: {printer.material}</Card.Text>
                                {/* <Card.Text>Acabados: {printer.material}</Card.Text> */}
                                <Card.Text>Precio: {printer.servicePrice} €/mm³</Card.Text>

                            </Col>
                        </Row>
                        {/* <Card.Text>Stock: {printer.Nombre_modelo}</Card.Text> */}
                    </Col> 
                </Row>

            </Card.Body>
        </Card>  

    );
 
}