import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Card, Container, Row, Col, InputGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// function NavigationBar( props) {
// function PedirPedido  ({ roll, query, setQuery, queryUbica, setQueryUbica, currentUser, logOut }) {
function PedirPedido  (props) {

  
  // const printers = props.printers[Number(props.printersId)];
  // const printers = props.printers[Number(props.printerId)];
  const printers = props.printers[Number(props.printerId)]; 
  console.log("printers: ", props.printers);
  console.log("number: ", Number(props.printerId));

  const roll = props.roll;
  const query = props.query;
  const queryUbica = props.queryUbica;
  const currentUser = props.currentUser;


  {/* <NavBar roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica}/> */}
  

  if (roll == "ROLE_USER") {
    roll = "diseñador";
  } 
  if (roll == "ROLE_ADMIN") {
    roll = "fabricante";
  }
  // roll = "fabricante";

  return (
    <div>
        <h2> vuenas tardas</h2>
          <Card.Text>Stock: {printers.Nombre_modelo}</Card.Text>
    </div>
  );
}

export default PedirPedido;