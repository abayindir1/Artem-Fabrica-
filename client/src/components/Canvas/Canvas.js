import React, {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";

function Canvas(props) {
 
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    var brush = {
        x: 0,
        y: 0
    }
    var strokes = []
  
    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.style.border = `3px solid red`;
  
      const context = canvas.getContext("2d")
      context.scale(2,2)
      context.lineCap = "round"
      context.strokeStyle = "black"
      context.lineWidth = 5
      contextRef.current = context;
      console.log(context)
    }, [])
  
    const startDrawing = ({nativeEvent}) => {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  
    const finishDrawing = () => {
     contextRef.current.closePath()
     setIsDrawing(false)
    }
  
    const draw = ({nativeEvent}) => {
      if(!isDrawing){
        return
      }
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
      brush.x = offsetX
      brush.y = offsetY
      strokes.push(brush)
    //   console.log(strokes)
      localStorage.setItem("bum", JSON.stringify(strokes))
    }
  
    return (
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    );
  }
Canvas.propTypes = {};

export default Canvas;
