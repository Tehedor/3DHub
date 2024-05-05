import "./FooterSection.css";

export default function FooterSection(props) {

  const cambioRoll = props.cambioRoll;


  return (
    <footer style={{ backgroundColor: cambioRoll === "DESIGNER" ? "#7D70BA" : cambioRoll === "MANUFACTURER" ? "#332a21" : "primary" }}>
      <h3 className="mensaje">footer que hara Claudia</h3>
    </footer>
  )
}