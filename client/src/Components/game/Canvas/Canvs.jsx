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
        socket.current = (io('http://localhost:3001'))
    },[])
    const drawimage = (canvas,ctx,image) => {
        let img = new Image()
        img.onload=start
        img.src = `${image}`
        function start(){
            let hRatio = canvas.width/img.width;
            let vRatio = canvas.height/img.height;
            let Ratio = Math.min(hRatio,vRatio);
            let centerShift_x = (canvas.width-img.width*Ratio)/2;
            let centerShift_y = (canvas.height-img.height*Ratio)/2;
            // ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.drawImage(img,0,0,img.width,img.height,centerShift_x,centerShift_y,img.width*Ratio, img.height*Ratio)
        }
    }
    useEffect(()=>{

        socket.current.on("receive_message",(data)=>{
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            console.log(data.test)
            drawimage(canvas,ctx,data.message)
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
            socket.current.emit("message",{message:image,test:'przyszlo'})
            console.log("rysuje")
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