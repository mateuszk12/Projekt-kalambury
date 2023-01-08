import Main from "./Components/Main"
import First from "./Components/firstPage/First";
import Game from "./Components/game/Game";
import Choosing from "./Components/middlePages/Choosing";
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Routes,Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<First/>}/>
        <Route path="kalambury/game" element={<Game/>}/>
        <Route path="kalambury" element={<Choosing/>}/>
      </Routes>
    </div>
  );
}

export default App;
