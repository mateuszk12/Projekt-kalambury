import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Link to="/"><Navbar.Brand>Kalabmury</Navbar.Brand></Link>
      <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="login">
              <Button>Login/Sign Up</Button>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
