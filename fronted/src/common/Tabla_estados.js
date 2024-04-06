import React from 'react';
import { Table, Image } from 'react-bootstrap';

const TablaEstados = () => {
  return (
    <Table  striped bordered hover variant="gray">
      <tbody>
        <tr>
          <th>Pagado</th>
          {/* <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/pagado.svg"} className="icon" alt="pagado" /></th> */}
          <th><Image src={"http://localhost:3000/iconos_estados/pagado.svg"} className="icon" alt="pagado" /></th>
        </tr>
        <tr>
          <th>Rechazado</th>
          <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/rechazado.svg"} className="icon" alt="rechazado" /></th>
        </tr>
        <tr>
          <th>Bajo revisión</th>
          <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/bajo_revision.svg"} className="icon" alt="bajo_revision" /></th>
        </tr>
        <tr>
          <th>Creando</th>
          <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/creando.svg"} className="icon" alt="creando" /></th>
        </tr>
        <tr>
          <th>Enviado</th>
          <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/enviado.svg"} className="icon" alt="enviado" /></th>
        </tr>
        <tr>
          <th>Terminado</th>
          <th><Image src={process.env.PUBLIC_URL + "/iconos_estados/terminado.svg"} className="icon" alt="terminado" /></th>
        </tr>
      </tbody>
    </Table>
  );
};

export default TablaEstados;