import Container from 'react-bootstrap/Container';
import { logout } from '../appState/features/auth';
import { Link } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavBar() {
  const username = useSelector((state) => state.auth.username);
  const path = username ? "/kalambury" : "/";
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logout())
  };
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Link to={path}><Button variant='light'>Kalabmury</Button></Link>
      <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
              {username ? <Button onClick={handleLogOut}>logout</Button> :<Link to="login"><Button>Login/Sign Up</Button></Link>}
          {/* <NavBar.Text>
            <Link to="admin">
              Admin
            </Link>
          </NavBar.Text> */}
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// export default function NavBar() {
//   return (
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    
//   );
// }
