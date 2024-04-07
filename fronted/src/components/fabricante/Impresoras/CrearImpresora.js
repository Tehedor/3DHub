import React, { useState, useRef } from "react";
import {Container, Card,Row, Col, Button, Image} from "react-bootstrap";

export default function CrearImpresora(props) {
    const [modelName, setModelName] = useState("");
    const [printerLocation, setPrinterLocation] = useState("");
    const [printerType, setPrinterType] = useState("");
    const [printerPhoto, setPrinterPhoto] = useState(null);
    const [servicePrice, setServicePrice] = useState("");
    const [maxUnities, setMaxUnities] = useState("");
    const [manufacturationSpeed, setManufacturationSpeed] = useState("");
    const [material, setMaterial] = useState("");

    

    return(
        <Col>

        </Col>        

    );
 
}
// {
//     "modelName":"Impresora1",
//     "printerLocation":"Madrid",
//     "printerType":"Normal",
//     "printerPhoto":null,
//     "servicePrice":9.0,
//     "maxUnities":2,
//     "manufacturationSpeed":"3",
//     "material":"plastico"

// }