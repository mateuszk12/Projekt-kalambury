import React from "react";
import Register from "./Register"
import Login from "./Login";
import BestPlayers from "./BestPlayers";
import Button from "react-bootstrap/Button"
import { useState } from "react"
export default function First(){
    const [btnClicked,setBtn] = useState(false)
    const clickHandler = () => {
        setBtn(true)
        console.log(btnClicked)
    }
    const handleClosing= () => {
        setBtn(false)
        console.log(btnClicked)
    }
    return (
        <div className="First">
            <div className="container">
                    <div className="Forms">
                        <Login/>
                        {!btnClicked && <Button className="registerBtn" variant="primary" size="lg" onClick={clickHandler}>Create New Account <i className="bi bi-plus-circle"></i></Button>}
                        {btnClicked && <Register handleClosing={handleClosing}/>}
                    </div>
                    <div className="Best">
                        <BestPlayers/>
                    </div> 
            </div>
                      
        </div>
        
    )
}