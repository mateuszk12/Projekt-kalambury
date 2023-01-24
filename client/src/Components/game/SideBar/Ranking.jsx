import React from "react";
import { useSelector } from "react-redux";
export default function Ranking(){
    const code = useSelector((state) => state.game.code)
    return (
        <div className="Ranking">
            <h2>Nazwa pokoju: {code}</h2>
            <h2>Rysujący: </h2>
            <h2>Pozostało słów: </h2>
        </div>
    )
}