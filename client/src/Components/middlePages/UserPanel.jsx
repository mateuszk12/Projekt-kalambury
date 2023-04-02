
import { useEffect,useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
export default function UserPanel(){
    const [points,setPoints] = useState(0)
    const [games,setGames] = useState(0)
    const username = useSelector((state) => state.auth.username)
    const token = useSelector((state) => state.auth.token)
    const lang = useSelector((state) => state.customize.lang)
    useEffect(()=>{
        const config = {headers:{'Authorization': `Bearer ${token}`},params:{username:username}}
        axios.get("http://localhost:3001/game/user",config)
            .then((res)=>{
                setPoints(res.data.points)
                setGames(res.data.games.count)
            })
            .catch((error) => {
                console.log(error.data)
            })
    },[])
    return(
        <div className="UserPanel container-fluid">
            <h1>{lang ? "Witaj!" : "Welcome!"} {username}</h1>
            <h2>{lang ? "Punkty" : "Points"}: {points}</h2>
            <h2>{lang ? "Ilość gier" : "Number of games"}: {games}</h2>
            
        </div>
    )
}