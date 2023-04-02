import axios from "axios"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux";
import { useState } from "react"
export default function Admin(){
    const token = useSelector((state)=>state.auth.token)
    const [username,setUsername] = useState("")
    const [word,setWord] = useState("")
    const [category,setCategory] = useState("")
    const [game,setGame] = useState("")
    const config = {headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}};
    const handleUser = (e) => {
        setUsername(e.target.value)
    }
    const handleWord = (e) => {
        setWord(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleGame = (e) => {
        setGame(e.target.value)
    }
    const handleRemove = (e) => {
        
        axios.delete("http://localhost:3001/admin",{headers:{Authorization:`Bearer ${token}`},data:{username:username}})
            .then((res) => {
                console.log(res.data)
                alert(`usunięto ${res.data.username}`)
            })
            .catch((err)=>{
                alert(err)
            })
        e.preventDefault()
    }
    const handleAddWord = (e) => {
        const data = {word:word.toLocaleLowerCase(),category:category.toLocaleLowerCase()}
        console.log(data)
        axios.post("http://localhost:3001/word/add",data,config)
            .then((res) => {
                alert(`dodano ${res.data}`)
            })
            .catch((err)=>{
                alert(err.response.data)
            })
            e.preventDefault()
    }
    const handleGetGame = (e) => {
        const config = {headers:{'Authorization': `Bearer ${token}`},params:{gameId:game}}
        axios.get("http://localhost:3001/game",config)
            .then((res)=>{
                console.log(res.data)
                alert(res.data)
            })
            .catch((err) => {
                alert(err.data)
            })
            e.preventDefault()
    }

    return(
       <div className="admin">
        <div className="card">
            <form onSubmit={handleRemove}>
                <input className="form-control" placeholder="username" onChange={handleUser} value={username}></input>
                <Button variant="dark" type="submit">remove</Button>
            </form>
        </div>
        <div className="card">
        <form onSubmit={handleAddWord}>
                <input className="form-control" placeholder="word" onChange={handleWord} value={word}></input>
                <input className="form-control" placeholder="category" onChange={handleCategory} value={category}></input>
                <Button variant="dark" type="submit">add</Button>
            </form>
        </div>
        <div className="card">   
        <form onSubmit={handleGetGame}>
                <input className="form-control" placeholder="game code" onChange={handleGame} value={game}></input>
                <Button variant="dark" type="submit">get</Button>
            </form>
        </div>
       </div>
    )
}