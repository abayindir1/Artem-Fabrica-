import React,{useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import CanvasDraw from "react-canvas-draw"

function PostItem(props) {
     const [drawing, setDrawing] = useState({})

     const canvasRef = useRef(null);

    useEffect(() => {
        const drawingString = JSON.stringify(props.post.drawing)
        setDrawing(drawingString)
        localStorage.setItem("drawings", drawing)
        // console.log(drawing)
    },[props.post.drawing, drawing]);
    return (
        <div>
            <CanvasDraw
          disabled
          hideGrid
          ref={canvasRef}
          saveData={localStorage.getItem("drawings")}
        />
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem

