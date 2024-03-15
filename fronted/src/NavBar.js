import { useState } from 'react';
import './NavBar.css';
import { Navbar, Nav, Form, FormControl, Button, Card, Container, Row, Col, InputGroup, Image } from 'react-bootstrap';

function NavigationBar({ roll, query, setQuery, queryUbica, setQueryUbica }) {
  {/* <NavBar roll={roll} query={query} setQuery={setQuery} queryUbica={queryUbica} setQueryUbica={setQueryUbica}/> */}
  
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

  return (

    
    <Navbar sticky="top"  bg={roll !== "fabricante" ? "primary" : "secondary"} expand="sm">
      <Container fluid>
{/*       
        <Navbar.Brand href="./">
          <Image className="logo" src={"http://localhost:3000/logo.png"} />
        </Navbar.Brand> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* <Nav className="mr-auto"> */}
          <Container ClassName="contenido1">
            <Nav className="me-auto">
                    
              <Navbar.Brand href="./">
                <Image className="logo" src={"http://localhost:3000/logo.png"} />
              </Navbar.Brand>
              {roll === "diseñador" ?
                <Nav.Link href="pedidos">pedidos</Nav.Link>
              : null
              }     
              {roll === "fabricante" ?
                <Nav.Link href="notificaciones">notifica</Nav.Link>
              : null
              }     

            </Nav>
          </Container>

          {/* <Form inline className="mx-auto  "> */}
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


          <Container className="contenido3 d-flex justify-content-between">
          {/* <Container ClassName="contenido3"> */}
            <div className="col-1 aling-item-lefth">
            {/* <Container ClassName="contenido3_1 col-1"> */}
              {roll === "diseñador"   ?
                  <Nav.Link href="carritocompra">C</Nav.Link>
                : null
              }
              {roll === "fabricante"   ?
                  <Nav.Link href="controlprinters">Impersoras</Nav.Link>
                : null
              }
            {/* </Container> */}
            </div>
              
            <div className=" col-9 ">
            {/* <Container ClassName="contenido3_2 col-9 "> */}
              <Button variant="dark"  >U</Button>
              <Button variant="dark" className="btn-outline-diseñador" href="loginDisenador ">logDiseñador</Button>
              <Button variant="dark" className="btn-outline-fabricante" href="loginFabricante">logFabricante</Button>
            {/* </Container> */}
            </div>
          </Container>
        </Navbar.Collapse>
        
      </Container>

    </Navbar>
  );
}

export default NavigationBar;