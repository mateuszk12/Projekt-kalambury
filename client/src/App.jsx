import NavBar from "./Components/NavBar";
import First from "./Components/firstPage/First";
import Game from "./Components/game/Game";
import Choosing from "./Components/middlePages/Choosing";
import Admin from "./Components/middlePages/Admin";
import { useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Routes,Route,useLocation} from "react-router-dom"
import LoginPage from "./Components/firstPage/LoginPage";

function App() {
  const location = useLocation();
  const user = useSelector((state)=>state.auth.username)
  return (
    <div className="App">
      {((location.pathname === "/kalambury/game") && user !== null) ? null : <NavBar/>}
      <Routes>
        <Route path="/" element={<First/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/kalambury" element={user ? <Choosing/> : <LoginPage/>}/>
        <Route path="/kalambury/game" element={user ? <Game/> : <LoginPage/>}/>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
