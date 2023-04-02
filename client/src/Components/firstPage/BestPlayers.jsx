import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
const playerss = require("../../testFIles/players.json")
export default function BestPlayers(){
    const [players,setPlayers] = useState([])
    const lang = useSelector((state) => state.customize.lang)
    useEffect(()=>{
        fetch("http://localhost:3001/sockets/best")
            .then((res) => res.json())
            .then((playrs) => setPlayers(playrs.sort((a,b)=>{
                return b.points-a.points
            })))
            setPlayers(playerss.sort((a,b)=>{
                return b.points-a.points
            }))
    },[])
    return (
        <div className="BestPlayers">
            <h1>{lang ? "Najlepsi gracze" :"Best Players"}</h1>
            <ul className="BP list-group">
                {players.map((data,index)=><li className="list-group-item" key={index}>{data.username}-{data.points}pkt</li>)}
            </ul>
        </div>  
    )
}