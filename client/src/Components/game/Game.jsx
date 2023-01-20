import React from "react";
import Canvas from "./Canvas/Canvs"
import SideBar from "./SideBar/SideBar";
import { GameContext } from "./context";
import {useState} from "react"
export default function Game(){
    const [code,setCode] = useState("")
    const codeHandler = (data)=>{
        setCode(data)
    }
    return(
        <div className="Game">
            <GameContext.Provider value = {codeHandler}>
                <SideBar/>
                <Canvas/>
            </GameContext.Provider>
        </div>
    )
}