import React from "react";
import Register from "./Register"
import Login from "./Login";
import BestPlayers from "./BestPlayers";
import Button from "react-bootstrap/Button"
import { useState } from "react"
export default function First(){
    return (
        <div className="First">
            
            <div className="container">
                <h1>Witaj</h1>
                    <div className="Best">
                        <BestPlayers/>
                    </div> 
            </div>
                      
        </div>
        
    )
}