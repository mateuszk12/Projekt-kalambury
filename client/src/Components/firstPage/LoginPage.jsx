import React from "react";
import Register from "./Register"
import Login from "./Login";
import Button from "react-bootstrap/Button"
import Collapse from 'react-bootstrap/Collapse'
import { useState } from "react"
export default function LoginPage(){
    const [btnClicked,setBtn] = useState(false)
    // const clickHandler = () => {
    //     setBtn(true)
    //     console.log(btnClicked)
    // }
    const handleClosing= () => {
        setBtn(false)
    }
    return (
        <div className="First">
            <div className="container">
                    <div className="Forms">
                        <Login/>
                        {/* {!btnClicked && <Button className="registerBtn" variant="primary" size="lg" onClick={clickHandler}>Create New Account <i className="bi bi-plus-circle"></i></Button>}
                        {btnClicked && <Register handleClosing={handleClosing}/>} */}
                         {!btnClicked && <Button
                            className="registerBtn"
                            variant="primary" 
                            size="lg"
                            aria-controls="register"
                            onClick={() => setBtn(!btnClicked)}
                            aria-expanded={btnClicked}
                        >
                            Create New Account
                        </Button>}
                        <Collapse in={btnClicked}>
                            <div id="register">
                                <Register handleClosing={handleClosing}/>
                            </div>
                        </Collapse>
                    </div>
            </div>
                      
        </div>
        
    )
}