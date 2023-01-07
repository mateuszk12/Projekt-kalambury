import React from "react";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
export default function Choosing()  {
    return(
        <div className="Choosing container">
            <JoinGame/>
            <CreateGame/>
        </div>
    )
}