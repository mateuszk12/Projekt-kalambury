import React from 'react'
import { useRef,useEffect,useState,createRef } from 'react'
import { useSelector} from "react-redux";
import { useLocation } from "react-router-dom"
import axios from "axios"
import io from "socket.io-client"
export default function Canvas(){
    const code = useSelector((state) => state.game.code)
    const username = useSelector((state) => state.auth.username)
    const [drawUs,setdrawUs] = useState("")
    const token = useSelector((state) => state.auth.token)
    const myref = createRef();
    const canvasRef = useRef(null)
    const contextRef = useRef(null) 
    const [isDrawing,setIsDrawing] = useState(false)
    const socket = useRef(null)
    const location = useLocation()
    useEffect(()=>{
        canvasRef.current.width = myref.current.getBoundingClientRect().width;
        canvasRef.current.height = myref.current.getBoundingClientRect().height;
        const context = canvasRef.current.getContext("2d")
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.linewidth = 50
        contextRef.current = context
        socket.current = (io('http://localhost:3002'))
        socket.current.emit("joinRoom",{gameId:code,username:username})
        const config = {headers: { "Authorization": `Bearer ${token}`,"Content-Type":"application/json" },params:{gameId:code}};
        axios.get("http://localhost:3001/game/current/image",config)
            .then((res) => {
                drawimage(canvasRef.current,context,res.data.image)
                setdrawUs(res.data.username)
            })
            .catch((err) => console.log(err))
    },[location])
    const drawimage = (canvas,ctx,image) => {
        let img = new Image()
        img.onload=start
        img.src = `${image}`
        function start(){
            const heightR = canvas.width/img.width;
            const widthR = canvas.height/img.height;
            const Ratio = Math.min(heightR,widthR);
            const centerX = (canvas.width-img.width*Ratio)/2;
            const centerY = (canvas.height-img.height*Ratio)/2;
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.drawImage(img,0,0,img.width,img.height,centerX,centerY,img.width*Ratio, img.height*Ratio)
        }
    }
    useEffect(()=>{
        socket.current.on("receiveImageGame",(image)=>{
            const canvas = canvasRef.current
            const ctx = contextRef.current
            drawimage(canvas,ctx,image)
          })
        
    },[socket])
    const handleResize = () => {
            const canvas = canvasRef.current
            const ctx = contextRef.current
            canvas.width = myref.current.getBoundingClientRect().width ;
            canvas.height = myref.current.getBoundingClientRect().height;
            drawimage(canvas,ctx)
    }
    useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return () => window.removeEventListener("resize",handleResize)
    })
    
    useEffect(()=>{
        if(!isDrawing){
            const canvas = canvasRef.current
            const image = canvas.toDataURL("image/png")
            socket.current.emit("imageGame",{image:image,gameId:code,username:username})
        }
    },[isDrawing])
    const drawStart = ({nativeEvent}) => {
    if (username === drawUs){
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)
    }
        

    }
    
    const drawFinish = () =>{
        contextRef.current.closePath()
        setIsDrawing(false)
        
    }
    const draw = ({nativeEvent}) =>{
        if (isDrawing){
            const {offsetX,offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
        } 
        
    }

    const drawDot = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent
        contextRef.current.fillRect(offsetX,offsetY,1,1)   
    }
    return(
        
        <div className='Canvas' ref={myref}>
            <canvas 
            onMouseDown={drawStart}
            onMouseUp={drawFinish}
            onMouseMove={draw}
            onMouseLeave={drawFinish}
            onClick={drawDot}
            ref={canvasRef}
            />
        </div>
    )
}