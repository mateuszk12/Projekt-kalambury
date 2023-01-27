import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
export default function Ranking(){
    const code = useSelector((state) => state.game.code)
    const username = useSelector((state) => state.auth.username)
    const navigate = useNavigate()
    const backHandler = () =>{
        navigate("/kalambury")
    }
    const refreshHandler = () => {
        window.location.reload(false);
    }
    return (
        <div className="Ranking">
            <div className="con">
                <h2>nazwa pokoju: {code}</h2>
                <h2>rysujący: {username} </h2>
                <h2>pozostało słów: </h2>
            </div>
            
            <div className="controls">
                <Button variant={"dark"}onClick={backHandler}><i className="bi bi-arrow-left"></i></Button>
                <Button variant={"dark"}onClick={refreshHandler}><i className="bi bi-arrow-clockwise"></i></Button>
            </div>
        </div>
    )
}