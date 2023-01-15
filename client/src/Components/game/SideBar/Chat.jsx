import React from "react";
import Message from "./Message";
import {useState,useEffect,useRef} from "react"
import io from "socket.io-client"
import Button from "react-bootstrap/Button"

export default function(){
    const socket = useRef(null)
    useEffect(()=>{
        socket.current = (io('http://localhost:3001'))
        socket.current.emit("joinRoom",{gameId:"orangutan"})
    },[])
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState({user:"",message:""})
    const handleMessage  = (e) => {
        setMessage({"message":e.target.value,user:"ja"})
    }
    const handleSubmit  = (e) => {
        if (message.message !== ""){
            e.preventDefault()
            socket.current.emit("chat",{gameId:"orangutan",message:message.message})
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
    useEffect(()=>{
        socket.current.on("chatReceived",(data)=>{
            console.log("działa czat")
            setMessages((prev) => [...prev,{user:"obcy",message:data}])
        })
    },[socket])
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