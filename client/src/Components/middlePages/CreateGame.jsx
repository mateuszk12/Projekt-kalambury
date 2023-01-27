import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import axios from "axios"
import { useDispatch,useSelector } from "react-redux";
import { addCode } from "../../appState/features/game";
import { useNavigate } from "react-router-dom";

export default function CreateGame(){
    const navigate = useNavigate()
    const token = useSelector((state)=>state.auth.token)
    const lang = useSelector((state) => state.customize.lang)
    const dispatch = useDispatch()
    const [users,setUsers] = useState("")
    const [max,setMax] = useState(0)
    const handleMax = (e) => {
        setMax(e.target.value)
    }
    const handleUsers = (e) => {
        setUsers(e.target.value)
    }
    const onSubmit = (e) => {
        const config = {headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }};
        const data = {}
        if (max > 0 || users !== "" ){
            if (max > 0){
                data.number = max
            }
            if (users !== ""){
                data.users = users
            }
        }
        axios.post("http://localhost:3001/game/create",data,config)
            .then((res) => {
                dispatch(addCode(res.data))
                navigate("/kalambury/game")
            })
            .catch((err)=>{
                alert(err)
            })
        e.preventDefault()
    } 
    return(
        <Card className="ic">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>{lang ?"Ilość osób(opcjonalne)" :"People Number(optional)"}</label>
                        <input type="text" className="form-control" onChange={handleMax} placeholder="how many people?" />
                    <label>{lang?"kto ne może dołączyć(opcjonalne)":"People who cant't join(optional)"}</label>
                    <input type="text" className="form-control" onChange={handleUsers} placeholder="usernames eg. user1,user2" />
                        <div to="game" className="d-grid gap-2">
                            <Button variant="dark" size="lg" type="submit">
                            {lang?"Stwórz":"Create"}
                            </Button>
                        </div>                
                </div>
            </form>
            <div>
                {}
            </div>
        </Card>
    )
}