import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';


import VerImpresora from './VerImpresora.js';


import ReseñaLista from '../../home/ReseñaLista.js';


function ImpresorasVista(props) {
  const form = useRef();
  const checkBtn = useRef();



  // Impresora del pedido
  const numberPrinter = Number(props.printerId);
  console.log("numberPrinter: ", numberPrinter);

  const searchPrinter = (id) => {
    for (let i = 0; i < props.printers.length; i++) {
      console.log(props.printers[i].id);
      if (props.printers[i].id == id) {
        return props.printers[i];
      }
    }
  }

  // const printer = props.printers[numberPrinter];
  const printer = searchPrinter(numberPrinter);





  console.log("printer: ", printer);
  const fabricantes = props.controlFabricantes;
  console.log("fabricante: ", fabricantes);


  const searchFabricante = (printer) => {
    const idFabricante = printer ? printer.idFabricante : 1;
    for (let i = 0; i < fabricantes.length; i++) {
      console.log(fabricantes[i]);
      if (fabricantes[i].id == idFabricante) {
        console.log(fabricantes[i]);
        return fabricantes[i];
      }
    }
  }
  const fabricante = searchFabricante(printer);

  // Raings 
  // productRating
  const allratings = props.ratings ? props.ratings : [];
  console.log(allratings);


  return (

    <Container>
      <Row class="impresora-caracteristicas">
        <VerImpresora printer={printer} ratings={allratings} fabricantes={fabricante} />
      </Row>


      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: '10px' }}>
        <ReseñaLista printer={printer} ratings={allratings} numberPrinter={numberPrinter} fabricantes={fabricante} />
      </Row>
    </Container>
  );
}

export default ImpresorasVista;