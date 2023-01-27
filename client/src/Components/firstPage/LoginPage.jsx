import React from "react";
import Register from "./Register"
import Login from "./Login";
import Button from "react-bootstrap/Button"
import Collapse from 'react-bootstrap/Collapse'
import { useSelector } from "react-redux";
import { useState } from "react"
export default function LoginPage(){
    const [btnClicked,setBtn] = useState(false)
    const lang = useSelector((state) => state.customize.lang)
    const handleClosing= () => {
        setBtn(false)
    }
    return (
        <div className="First">
            <div className="container">
                    <div className="Forms">
                        <Login/>
                        
                         {!btnClicked && <Button
                            className="registerBtn"
                            variant="dark" 
                            size="lg"
                            aria-controls="register"
                            onClick={() => setBtn(!btnClicked)}
                            aria-expanded={btnClicked}
                        >
                           {lang ? "stwórz nowe konto" :"Create new account"}
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

