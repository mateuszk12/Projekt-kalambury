import axios from "axios"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux";
import { useState } from "react"
export default function Admin(){
    const token = useSelector((state)=>state.auth.token)
    const [username,setUsername] = useState("")
    const [word,setWord] = useState("")
    const [game,setGame] = useState("")
    const config = {headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }};
    const handleUser = (e) => {
        setUsername(e.target.value)
    }
    const handleWord = (e) => {
        setWord(e.target.value)
    }
    const handleGame = (e) => {
        setGame(e.target.value)
    }
    const handleRemove = () => {
        
        const data = {username:username}
        axios.post("http://localhost:3001/user",data,config)
            .then((res) => {
                alert(`usunięto ${res.data.username}`)
            })
            .catch((err)=>{
                alert(err)
            })
    }
    const handleAddWord = () => {
        const data = {word:word.toLocaleLowerCase()}
        axios.post("http://localhost:3001/user",data,config)
            .then((res) => {
                alert(`dodano ${res.data}`)
            })
            .catch((err)=>{
                alert(err.data)
            })
    }
    const handleGetGame = () => {
        const config = {headers:{'Authorization': `Bearer ${token}`},params:{gameId:game}}
        axios.get("http://localhost:3001/user",config)
            .then((res)=>{
                alert(res.data)
            })
            .catch((err) => {
                alert(err.data)
            })
    }

    return(
       <div className="admin">
        <div className="card">
            <form onSubmit={handleRemove}>
                <input className="form-control" placeholder="username" onChange={handleUser} value={username}></input>
                <Button variant="dark" onClick={handleRemove}>remove</Button>
            </form>
        </div>
        <div className="card">
        <form onSubmit={handleAddWord}>
                <input className="form-control" placeholder="word" onChange={handleWord} value={word}></input>
                <Button variant="dark">add</Button>
            </form>
        </div>
        <div className="card">   
        <form onSubmit={handleGetGame}>
                <input className="form-control" placeholder="game code" onChange={handleGame} value={game}></input>
                <Button variant="dark">get</Button>
            </form>
        </div>
       </div>
    )
}