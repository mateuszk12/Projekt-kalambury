import React from "react";
import { useState,useEffect } from "react";
export default function BestPlayers(){
    const [players,setPlayers] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/bestPlayers")
            .then((res) => res.json())
            .then((playrs) => setPlayers(playrs.sort((a,b)=>{
                return b.points-a.points
            })))
    },[])
    return (
        <div className="BestPlayers">
            <h1>Best Players</h1>
            <ul className="BP list-group">
                {players.map((data,index)=><li className="list-group-item" key={index}>{data.name}-{data.points}pkt</li>)}
            </ul>
        </div>  
    )
}