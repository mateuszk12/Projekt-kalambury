import React from 'react'
import { useRef,useEffect,useState } from 'react'
export default function Canvas(){
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [pos,setPos] = useState("")
    const myref = React.createRef();
    const [isDrawing,setIsDrawing] = useState(false)
    // const [wss,setWss] = useState(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        canvas.width = myref.current.getBoundingClientRect().width;
        canvas.height = myref.current.getBoundingClientRect().height;
        const context = canvas.getContext("2d")
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.linewidth = 50
        contextRef.current = context
        // const webS = new WebSocket('wss://canvas')
        // webS.onmessage((e)=>{
        //    drawImage(canvas)
        // })
        // setWss(webS)
    },[])
    const drawImage = (canvas,ctx) => {
        let img = new Image()
        img.src = `${pos}`
        let hRatio = canvas.width/img.width;
        let vRatio = canvas.height/img.height;
        let Ratio = Math.min(hRatio,vRatio);
        let centerShift_x = (canvas.width-img.width*Ratio)/2;
        let centerShift_y = (canvas.height-img.height*Ratio)/2;
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(img,0,0,img.width,img.height,centerShift_x,centerShift_y,img.width*Ratio, img.height*Ratio)
    }
    useEffect(()=>{
        //zrobic inaczej 
        window.onresize = function(){
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            canvas.width = myref.current.getBoundingClientRect().width ;
            canvas.height = myref.current.getBoundingClientRect().height;
            drawImage(canvas,ctx)
        }
    })
    
    useEffect(()=>{
        if(!isDrawing){
            const canvas = canvasRef.current
            const image = canvas.toDataURL("image/png")
            setPos(image)
            // wss.send(image)
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
            setPos({x:offsetX,y:offsetY})
            // console.log(myref.current.getBoundingClientRect().width,myref.current.getBoundingClientRect().height)
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
        } else {
            
            
        }
        
    }
    return(
        <div className='Canvas' ref={myref}>
            <canvas 
            onMouseDown={drawStart}
            onMouseUp={drawFinish}
            onMouseMove={draw}
            onMouseLeave={drawFinish}
            ref={canvasRef}
            />
            
        </div>
    )
}