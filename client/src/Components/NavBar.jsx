import Container from 'react-bootstrap/Container';
import { logout } from '../appState/features/auth';
import { changeLang } from '../appState/features/custom';
import { Link } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavBar() {
  const username = useSelector((state) => state.auth.username);
  const roles = useSelector((state) => state.auth.roles)
  const lang = useSelector((state) => state.customize.lang)
  const role = roles.includes("admin")
  const path = username ? "/kalambury" : "/";
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logout())
  };
  const handleLang = () => {
    dispatch(changeLang())
  }
  return (
    <Navbar expand="lg">
    <Container>
      <Link to={path}><Button  variant="outline-dark">Kalabmury</Button></Link>
      <div>
        {lang ? <Button onClick={handleLang} variant="outline-dark">pl</Button>:<Button onClick={handleLang} variant="outline-dark">en</Button>}
        {role && username ? <Link to="admin"><Button variant="outline-dark">admin</Button></Link>:""}
        {username ? <Button variant="dark" onClick={handleLogOut}>logout</Button> :<Link to="login"><Button variant="outline-dark">Login/Sign Up</Button></Link>}
      </div>
    </Container>
  </Navbar>
  );
}
