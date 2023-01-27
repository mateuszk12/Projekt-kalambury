import React from "react";
import BestPlayers from "./BestPlayers";
import { useSelector } from "react-redux";
export default function First(){
    const lang = useSelector((state) => state.customize.lang)
    return (
        <div className="First">
            
            <div className="container">
                <h1>{lang ? "Witaj" :"Welcome"}</h1>
                    <div className="Best">
                        <BestPlayers/>
                    </div> 
            </div>
                      
        </div>
        
    )
}