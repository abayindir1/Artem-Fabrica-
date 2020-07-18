import React,{useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import CanvasDraw from "react-canvas-draw"

function PostItem(props) {
    //  const [drawing, setDrawing] = useState({})

     var canvasRef = useRef(null);

    useEffect(() => {
        const drawingData = props.post.drawing

        
        for(let i = 0; i < drawingData.lines.length; i++){
            delete drawingData.lines[i]._id
            for(let j = 0; j<drawingData.lines[i].points.length; j++){
                delete drawingData.lines[i].points[i]._id
            }
        }
        // localStorage.setItem("drawings", JSON.stringify(drawingData))
        canvasRef.current.loadSaveData(JSON.stringify(drawingData))
    },[]);


    return (
        <div>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvas => (canvasRef = canvas)}
          style={{ border: "3px solid red" }}
          />
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem

