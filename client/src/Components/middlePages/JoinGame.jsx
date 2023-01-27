import {useState} from "react";
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Button from "react-bootstrap/Button";
import { useSelector,useDispatch } from "react-redux";
import { addCode } from "../../appState/features/game";
export default function JoinGame(){
    const [gameCode,setGameCode] = useState('')
    const username = useSelector((state) => state.auth.username)
    const token = useSelector((state)=>state.auth.token)
    const lang = useSelector((state) => state.customize.lang)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInput = (e) =>{
        setGameCode(e.target.value)
    }
    const onSubmit = (e) => {
        dispatch(addCode(gameCode))       
        const config = {headers:{'Authorization': `Bearer ${token}`},params:{gameId:gameCode,username:username}}
        axios.get("http://localhost:3001/game/join",config)
            .then((res)=>{
                navigate("/kalambury/game")
            })
            .catch((error) => {
                alert(error.data)
            })
        e.preventDefault()
    }   
    return(
        <Card className="ic">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>{lang?"Kod gry":"Game Code"}</label>
                    <input className="form-control" placeholder="enter game code" onChange={handleInput} value={gameCode}  />
                    <div className="d-grid">
                        <Button variant="dark" size="lg" type="submit">{lang?"Dołącz":"Join"}</Button>
                    </div>         
                </div>
            </form>

        </Card>
    )
}