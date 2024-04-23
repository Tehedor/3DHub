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

    <Navbar sticky="top" style={{ backgroundColor: cambioRoll === "diseñador" ? "#7D70BA" : cambioRoll === "fabricante" ? "#332a21" : cambioRoll === "user" ? "#006400" : "primary" }} expand="sm"> {/* <Navbar sticky="top"  bg={rollValue !== "fabricante" ? "primary" : "secondary"} expand="sm"> */}
    
      <Container>

      

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav>
          <Row className="d-flex align-items-center">
            <Col lg={1}>
              <Navbar.Brand href="/">
                        <Image className="logo" src={"http://localhost:3000/logo_pato.png"} style={{width: '120px', height: '120px'}}/>
              </Navbar.Brand>
            </Col>

            <Col lg={3}>
              <Row>

                <Col>
                  <Nav.Link href="/atencionCliente">
                    <Container>
                      <Row><img src={"http://localhost:3000/iconos/support_icon.svg"} alt="Pedidos" /></Row>
                      <Row><strong>AtCliente</strong></Row>
                    </Container>
                  </Nav.Link>
                </Col>
                <Col>
                  {currentUser && cambioRoll === "diseñador" ?
                    <Nav.Link href="/pedidos">
                      <Container>
                        <Row><img src={"http://localhost:3000/iconos/inventory_2_icon.svg"} alt="Pedidos" /></Row>
                        <Row><strong>Pedidos</strong></Row>
                      </Container>
                    </Nav.Link>
                  : null}
                  {currentUser && cambioRoll === "fabricante" ?
                    <Nav.Link href="/notificaciones">
                      <Container>
                        <Row><img src={"http://localhost:3000/iconos/bookmark_icon.svg"} alt="Notificaciones" /></Row>
                        <Row><strong>Notificaciones</strong></Row>
                      </Container>
                    </Nav.Link>
                  : null} 
                </Col>
              </Row>

            </Col>

            <Col lg={4}>
              <Container ClassName="contenido2">
                <Form inline className="justify-content-center flex-grow-1">
                  <Row className="w-100">
                    <InputGroup className="mb-3" size="sm">
                      <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')}/>
                      <Button variant="secondary" id="button-addon2" onClick={handleSearchClick}> Search </Button>
                    </InputGroup>
                  </Row>
                  <Row className="w-100">
                    <InputGroup className="mb-3" size="sm">
                      <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')}/>
                      <Button variant="secondary" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                    </InputGroup>
                  </Row>
                </Form>
              </Container>
            </Col>

            <Col lg={2}>       
              {currentUser && cambioRoll === "diseñador"   ?
                <Nav.Link href="/carritocompra">
                  <Container>
                    {/* <Row><img src={"http://localhost:3000/iconos/cart_icon.svg"} alt="Carrito" /></Row> */}
                    <Row><strong>Carrito</strong></Row>  
                  </Container>  
                </Nav.Link>
              : null}
              {currentUser && cambioRoll === "fabricante"   ?
                <Nav.Link href="/impresorasfabri">
                  <Container>
                    {/* <Row><img src={"http://localhost:3000/iconos/print_FILL0_icon.svg"} alt="Impresoras" /></Row> */}
                    <Row><strong>Impresoras</strong></Row>
                  </Container>
                </Nav.Link>
              : null}    
            </Col>

            <Col lg={2}>        
              {!currentUser ? (
                <Nav.Link href="/login">
                  <Container>
                    {/* <Row><img src={"http://localhost:3000/iconos/login_icon.svg"} alt="User Icon" /></Row> */}
                    <Row><strong>Login</strong></Row>
                  </Container>
                </Nav.Link>
              ):(
                <Container>
                  <ButtonGroup>
                    {roll.map((roll, idx) => (
                      <ToggleButton
                      key={idx}
                      id={`roll-${idx}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-warning' : 'outline-dark'}
                      name="roll"
                      value={roll.value}
                      // checked={rollValue === roll.value}
                      checked={cambioRoll === roll.value}
                      // onChange={(e) => setRollValue(e.currentTarget.value)}
                      onChange={(e) => cambiarRoll(e.currentTarget.value)}
                      >
                        {roll.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                  <Nav.Link href="/" onClick={logOut}>
                    <Container>
                      {/* <Row> <img src={"http://localhost:3000/iconos/logout_icon.svg"} alt="User Icon" /></Row> */}
                      <Row><strong>logOut</strong></Row>
                    </Container>
                  </Nav.Link>
                </Container>
              )}
            </Col>
          </Row>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  
  
  );
}

export default NavigationBar;