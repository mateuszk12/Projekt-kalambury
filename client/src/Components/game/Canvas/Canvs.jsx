import React from 'react'
import { useRef,useEffect,useState } from 'react'
import io from "socket.io-client"
export default function Canvas(){
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [pos,setPos] = useState("")
    const myref = React.createRef();
    const [isDrawing,setIsDrawing] = useState(false)
    const socket = useRef(null)
    useEffect(()=>{
        const canvas = canvasRef.current
        canvas.width = myref.current.getBoundingClientRect().width;
        canvas.height = myref.current.getBoundingClientRect().height;
        const context = canvas.getContext("2d")
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.linewidth = 50
        contextRef.current = context
        socket.current = (io('http://localhost:3002'))
        socket.current.emit("joinRoom",{gameId:"orangutan"})
    },[])
    const drawimage = (canvas,ctx,image) => {
        let img = new Image()
        img.onload=start
        img.src = `${image}`
        function start(){
            let heightR = canvas.width/img.width;
            let widthR = canvas.height/img.height;
            let Ratio = Math.min(heightR,widthR);
            let centerX = (canvas.width-img.width*Ratio)/2;
            let centerY = (canvas.height-img.height*Ratio)/2;
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.drawImage(img,0,0,img.width,img.height,centerX,centerY,img.width*Ratio, img.height*Ratio)
        }
    }
    useEffect(()=>{
        socket.current.on("receiveImageGame",(image)=>{
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            drawimage(canvas,ctx,image)
          })
        
    },[socket])
    useEffect(()=>{
        //zrobic inaczej 
        window.onresize = function(){
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            canvas.width = myref.current.getBoundingClientRect().width ;
            canvas.height = myref.current.getBoundingClientRect().height;
            drawimage(canvas,ctx,pos)
        }
    })
    
    useEffect(()=>{
        if(!isDrawing){
            const canvas = canvasRef.current
            const image = canvas.toDataURL("image/png")
            socket.current.emit("imageGame",{image:image,gameId:"orangutan"})
        }
    },[isDrawing])
    const drawStart = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)

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
        } else {
            
            
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