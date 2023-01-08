import React from 'react'
import { useRef,useEffect,useState } from 'react'
export default function Canvas(){
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [pos,setPos] = useState({x:0,y:0})
    const myref = React.createRef();
    const [isDrawing,setIsDrawing] = useState(false)
    useEffect(()=>{
        const canvas = canvasRef.current
        canvas.width = myref.current.getBoundingClientRect().width;
        canvas.height = myref.current.getBoundingClientRect().height;
        const context = canvas.getContext("2d")
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.linewidth = 50
        contextRef.current = context
    },[])
    useEffect(()=>{
        window.onresize = function(){
            const canvas = canvasRef.current
            canvas.width = myref.current.getBoundingClientRect().width ;
            canvas.height = myref.current.getBoundingClientRect().height;
        }
    })
    const image = () => {
        const canvas = canvasRef.current
        console.log("działa")
            // const d = canvas.toDataURL("image/png")
            // const w = window.open('about:blank', 'image from canvas');
            // w.document.write("<img src='"+d+"' alt='from canvas'/>");
    }
    useEffect(()=>{
        if(!isDrawing){
            image()
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