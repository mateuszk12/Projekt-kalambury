import React from "react";
import Canvas from "./Canvas/Canvs"
import SideBar from "./SideBar/SideBar";
export default function Game(){
    return(
        <div className="Game">
            <SideBar/>
            <Canvas/>
        </div>
    )
}