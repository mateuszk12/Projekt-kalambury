import React from "react";
import Message from "./Message";
import {useState} from "react"
import Button from "react-bootstrap/Button"

export default function(){
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState({user:"",message:""})
    const handleMessage  = (e) => {
        setMessage({"message":e.target.value,user:"ja"})
    }
    const handleSubmit  = (e) => {
        if (message.message !== ""){
            e.preventDefault()
            setMessages(prev => [...prev,message])
            setMessage({user:"",message:""})
            
        } else {
            e.preventDefault()
        }
        
    }
    // const styleMess = () =>{
    //     if (message.user === "ja"){
    //         return {"justify-content": "flex-end"}
    //     } else{
    //         return {"justify-content": "flex-start"}
    //     }
    // }
    
    return(
        <div className="Chat">
            <div className="messages" >
            <ul>
            {messages.map((value,index)=>
                <li key={index} >
                    <Message message={value.message} user={value.user}/>
                </li> 
            )}
            </ul>
            </div>
            <div className="ChatFormDiv">
            <form onSubmit={handleSubmit} className="ChatForm">
                <input className="inputChat" type="text" value={message.message} onChange={handleMessage}/>
                <button className="btnChat" type="submit"><i className="bi bi-send"></i></button>
            </form>
            </div>
            

        </div>
    )
}