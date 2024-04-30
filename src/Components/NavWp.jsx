import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoScritta from "../assets/logoscritta.png";

const NavWp = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col xs={6}>
          <img src={LogoScritta} alt="logo" width={150} className="h-auto pe-4" />
          <Link to="/" className="btn btn-outline-success">
            Home
          </Link>
        </Col>
        <Col xs={6} className="text-end">
          <Link to="/create-post" className="btn btn-outline-success">
            Create New
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NavWp;
