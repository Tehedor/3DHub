import { useState } from 'react';
import './NavBar.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, InputGroup, Image, ButtonGroup, ToggleButton } from 'react-bootstrap';



import useLocalStorage from "../../common/useLocalStorage";

// function NavigationBar( props) {
// function NavigationBar({ roll, query, setQuery, queryUbica, setQueryUbica, currentUser, logOut }) {
function NavigationBar({ query, setQuery, queryUbica, setQueryUbica, currentUser, logOut, theRollActual,setTheRollControl,setCambioRoll,cambioRoll }) {
  

  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Contorl de roles
  // ##### ##### ##### ##### ##### ##### ##### #####
  const cambiarRoll = (roll) => {
    setCambioRoll(roll);
    setTheRollControl(roll);
  }
    
  const roll = [
    { name: 'Diseñador', value: 'diseñador' },
    { name: 'Fabricante', value: 'fabricante' },
  ];
 
  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de busqueda
  // ##### ##### ##### ##### ##### ##### ##### #####
  const [localQuery, setLocalQuery] = useState(query);
  const [localQueryUbica, setLocalQueryUbica] = useState(queryUbica);

  const handleQueryChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleQueryUbicaChange = (event) => {
    setLocalQueryUbica(event.target.value);
  };

  const handleSearchClick = () => {
    setQuery(localQuery);
    setQueryUbica(localQueryUbica);
  };


  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Return
  // ##### ##### ##### ##### ##### ##### ##### #####
  return (

    
   <Navbar sticky="top" style={{ backgroundColor: cambioRoll === "diseñador" ? "#7D70BA" : cambioRoll === "fabricante" ? "#332a21" : cambioRoll === "user" ? "#006400" : "primary" }} expand="sm">
  <Container fluid>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Container ClassName="contenido1">
        <Nav className="me-auto">
          <Navbar.Brand href="/">
            <Image className="logo" src={"http://localhost:3000/logo_pato.png"} style={{width: '120px', height: '120px'}}/>
          </Navbar.Brand>
          <Col className="d-flex align-items-center">
            <div className="col-1 aling-item-lefth justify-content-between">
              <Button href="/atencionCliente" variant="light">
                <img src={"http://localhost:3000/iconos/support_icon.svg"} alt="Pedidos" />
                <strong>AtCliente</strong>
              </Button>
            </div>
          </Col>
          <Col className="d-flex align-items-center">
            <div className="col-1 aling-item-lefth justify-content-between">
              {currentUser && cambioRoll === "diseñador" ?
                <Button href="/pedidos" variant="light" >
                  <img src={"http://localhost:3000/iconos/inventory_2_icon.svg"} alt="Pedidos" />
                  <strong>pedidos</strong>  
                </Button>
              : null
              }
              {currentUser && cambioRoll === "fabricante" ?
                <Button href="/notificaciones" variant="light">
                  <img src={"http://localhost:3000/iconos/bookmark_icon.svg"} alt="Notificaciones" />
                  <strong>Notificaciones</strong>
                </Button>
              : null
              }
            </div>
          </Col>
        </Nav>
      </Container>
      <Container ClassName="contenido2">
        <Form inline className="justify-content-center flex-grow-1">
          <Row className="w-100">
            <InputGroup className="mb-3" size="sm">
              <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')}/>
              <Button variant="light" id="button-addon2" onClick={handleSearchClick}> Search </Button>
            </InputGroup>
          </Row>
          <Row className="w-100">
            <InputGroup className="mb-3" size="sm">
              <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')}/>
              <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
            </InputGroup>
          </Row>
        </Form>
      </Container>
      <Container className="contenido3 d-flex justify-content-between">
        <div className="col-2 aling-item-lefth">
          {currentUser && cambioRoll === "diseñador" ?
            <Button href="/carritocompra" variant="light">
              <img src={"http://localhost:3000/iconos/cart_icon.svg"} alt="Carrito" />
              <strong>Carrito </strong>
            </Button>
          : null
          }
          {currentUser && cambioRoll === "fabricante" ?
            <Button href="/impresorasfabri" variant="light">
              <img src={"http://localhost:3000/iconos/print_FILL0_icon.svg"} alt="Impresoras" />
              <strong>Impresoras</strong>
            </Button>
          : null
          }
        </div>
        <div className="col-8">
          {currentUser ? 
            <ButtonGroup>
              {roll.map((roll, idx) => (
                <ToggleButton
                  key={idx}
                  id={`roll-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-warning' : 'outline-light'}
                  name="roll"
                  value={roll.value}
                  checked={cambioRoll === roll.value}
                  onChange={(e) => cambiarRoll(e.currentTarget.value)}
                >
                  {roll.name}
                </ToggleButton>
              ))}
            </ButtonGroup>      
          : null
          }
        </div>
        <div className="col-2">
          {!currentUser ? (
            <Button variant="light" className="btn-outline-diseñador" href="/login ">
              <img src={"http://localhost:3000/iconos/login_icon.svg"} alt="User Icon" />
              <strong>Login</strong>
            </Button>
          ) : (
            <Container>
              <Button variant="light" className="btn-outline-fabricante" href="/" onClick={logOut}> 
                <img src={"http://localhost:3000/iconos/logout_icon.svg"} alt="User Icon" />
                <strong>LogOut</strong>
              </Button>
            </Container>
          )}
        </div>

      </Container>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavigationBar;