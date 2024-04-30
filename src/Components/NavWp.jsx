import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoScritta from "../assets/logoscritta.png";

const NavWp = () => {
  return (
    <Container className="py-5">
      <img src={LogoScritta} alt="logo" width={150} className="h-auto pe-4" />
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </Container>
  );
};

export default NavWp;
