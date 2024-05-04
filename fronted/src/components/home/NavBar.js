import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from "../../services/auth.service";


import './NavBar.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, InputGroup, Image, ButtonGroup, ToggleButton } from 'react-bootstrap';

function NavigationBar({ query, setQuery, queryUbica, setQueryUbica, currentUser, logOut, theRollActual, setTheRollControl, setCambioRoll, cambioRoll }) {


  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de roles
  // ##### ##### ##### ##### ##### ##### ##### #####
  const navigate = useNavigate();
  const cambiarRoll = (roll) => {
    // setTheRollControl(roll);
    setTheRollControl(roll);
    setCambioRoll(roll);
    navigate('/');
  }
  const roll = [
    { name: 'Diseñador', value: 'diseñador' },
    { name: 'Fabricante', value: 'fabricante' },
  ];

  const rolesUser = AuthService.getUserRoles();
  console.log(rolesUser);
  const hasRole = (role) => rolesUser.includes(role);


  // ##### ##### ##### ##### ##### ##### ##### #####
  // ##### ##### Control de búsqueda
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
  console.log(theRollActual);
  return (
    <Navbar sticky="top" style={{ backgroundColor: cambioRoll === "diseñador" ? "#7D70BA" : cambioRoll === "fabricante" ? "#332a21" : cambioRoll === "user" ? "#006400" : "primary" }} expand="sm">
      <Container fluid id="flexing">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Logo/AtCliente/Pedidos/Notificaciones/Carrito/Impresoras */}
          <Container ClassName="contenido1" id="contenido1">
            {/* Logo */}
            <Navbar.Brand href="/">
              <Image className="patologo" src={"http://localhost:3000/logo_pato.png"} />
            </Navbar.Brand>
            <Nav className="me-auto">
              {/* Atención al cliente */}
              <Col className="d-flex align-items-center art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  <Button href="/atencionCliente" variant="light">
                    <img src={"http://localhost:3000/iconos/support_icon.svg"} alt="Pedidos" />
                    <strong>AtCliente</strong>
                  </Button>
                </div>
              </Col>
              {/* Pedidos/Notificaciones */}
              <Col className="d-flex align-items-center art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  {currentUser && theRollActual === "diseñador" ?
                    <Button href="/pedidos" variant="light" >
                      <img src={"http://localhost:3000/iconos/inventory_2_icon.svg"} alt="Pedidos" />
                      <strong>Pedidos</strong>
                    </Button>
                    : null
                  }
                  {currentUser && theRollActual === "fabricante" ?
                    <Button href="/notificaciones" variant="light">
                      <img src={"http://localhost:3000/iconos/bookmark_icon.svg"} alt="Notificaciones" />
                      <strong>Notificaciones</strong>
                    </Button>
                    : null
                  }
                </div>
              </Col>
              {/* Carrito/Impresoras */}
              <Col className="d-flex align-items-center  art1">
                <div className="col-1 aling-item-lefth justify-content-between">
                  {currentUser && theRollActual === "diseñador" ?
                    <Button href="/carritocompra" variant="light">
                      <img src={"http://localhost:3000/iconos/cart_icon.svg"} alt="Carrito" />
                      <strong>Carrito </strong>
                    </Button>
                    : null
                  }
                  {currentUser && theRollActual === "fabricante" ?
                    <Button href="/impresorasfabri" variant="light">
                      <img src={"http://localhost:3000/iconos/print_FILL0_icon.svg"} alt="Impresoras" />
                      <strong>Impresoras</strong>
                    </Button>
                    : null
                  }
                </div>
              </Col>
            </Nav>
          </Container>
          {/* Busqueda 1 */}
          <Container ClassName="contenido2" class="busqueda" id="busqueda1">
            <Form inline className="justify-content-center flex-grow-1" id="find">
              <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                  <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')} />
                  <Button variant="light" id="button-addon2" onClick={handleSearchClick}> Search </Button>
                </InputGroup>
              </Row>
              <Row className="w-100">
                <InputGroup className="mb-3" size="sm">
                  <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')} />
                  <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
                </InputGroup>
              </Row>
            </Form>
          </Container>
          {/* Role/Login */}
          <Container className="contenido3 d-flex">
            {/* Role */}
            {hasRole("MANUFACTURER") && hasRole("DESIGNER") ? (
              <div className="col-8">
                {currentUser ? (
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
                        onChange={(e) => setCambioRoll(e.currentTarget.value)}
                      >
                        {roll.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                ) : null}
              </div>
            ) : null}
            {/* Login/Logout */}
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
        {/* Busqueda 2 */}
        <Container ClassName="contenido4" class="busqueda" id="busqueda2">
          <Form inline className="justify-content-center flex-grow-1 find">
            <Row className="w-100">
              <InputGroup className="mb-3" size="sm">
                <FormControl placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={localQuery} onChange={handleQueryChange} onClick={() => setLocalQuery('')} />
                <Button variant="light" id="button-addon2" onClick={handleSearchClick}> Search </Button>
              </InputGroup>
            </Row>
            <Row className="w-100">
              <InputGroup className="mb-3" size="sm">
                <FormControl placeholder="Location" aria-label="Search" aria-describedby="basic-addon2" value={localQueryUbica} onChange={handleQueryUbicaChange} onClick={() => setLocalQueryUbica('')} />
                <Button variant="light" id="button-addon2" onClick={handleSearchClick}>Search</Button>
              </InputGroup>
            </Row>
          </Form>
        </Container>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;