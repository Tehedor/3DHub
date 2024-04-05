import "./FooterSection.css";

export default function Header(props) {  
    return (<footer>
        {/* <img className="logo" src={process.env.PUBLIC_URL + "/sun.webp"} alt="logo" /> */}
        <img className="logo" src={"http://localhost:3000/logo_pato.png"} />
        {/* <h3 className="mensaje">Bienvenido a la página de Sergio Tejedor</h3>       */}
        <h3 className="mensaje">footer que hara alguien</h3>
    </footer>
    )
  }