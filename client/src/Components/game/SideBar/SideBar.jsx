import React from "react";
import Chat from "./Chat";
import Ranking from "./Ranking";
export default function SideBar(){

    return(
        <div className="SideBar">
            <Chat/>
            <Ranking/>
        </div>
    )
}