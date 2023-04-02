import React from "react";
import axios from "axios"
import Message from "./Message";
import {useState,useEffect,useRef} from "react"

import io from "socket.io-client"

import { useSelector } from "react-redux";

export default function(){
    const code = useSelector((state)=>state.game.code)
    const token = useSelector((state)=>state.auth.token)
    const username = useSelector((state)=>state.auth.username)
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState({user:"",message:""})
    const [drawUs,setDrawUs]  = useState("")
    const socket = useRef(null)
    useEffect(()=>{
        socket.current = (io('http://localhost:3002'))
        socket.current.emit("joinRoom",{gameId:code})
        const config = {headers:`Authorization: Bearer ${token}`,params:{gameId:code}}
        axios.get("http://localhost:3001/game/current/chat",config)
            .then((res) => {
                if (res.data.messages.length > 0){
                    res.data.messages.forEach((val) => setMessages(prev => [...prev,{user:val.username,message:val.message}]))
                }
                setDrawUs(res.data.username)
            })
    },[])
   
    const handleMessage  = (e) => {
        setMessage({"message":e.target.value,user:username})
    }
    const handleSubmit  = (e) => {
        if (message.message !== ""){
            e.preventDefault()
            console.log(drawUs !== username)
            if (drawUs !== username){
                socket.current.emit("chat",{gameId:code,message:message.message,username:username})
                setMessages(prev => [...prev,message])
            }
            
            setMessage({user:"",message:""})
            
        } else {
            e.preventDefault()
        }
        
    }
    useEffect(()=>{
        socket.current.on("chatReceived",(data)=>{
            console.log(data)
            setMessages((prev) => [...prev,{user:data.username,message:data.message}])
        })
        socket.current.on("drawUs",(user)=>{
            setDrawUs(user.user)
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
                <button className="btnChat" type="submit"><i className="bi bi-send fa-sm"></i></button>
            </form>
            </div>
            

        </div>
    )
}