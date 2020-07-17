import React,{useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import CanvasDraw from "react-canvas-draw"

function PostItem(props) {
     const [drawing, setDrawing] = useState({})

     const canvasRef = useRef(null);

    useEffect(() => {
        const drawingData = props.post.drawing

        setDrawing(JSON.stringify(drawingData))
        // console.log(drawingData)

        for(let i = 0; i < drawingData.lines.length; i++){
            // console.log(drawingData.lines[i].points)
            for(let j = 0; j<drawingData.lines[i].points.length; j++){
                delete drawingData.lines[i].points[i]._id
                console.log(drawingData.lines[i].points[i])
            }
        }
    },[]);


    return (
        <div>
            <CanvasDraw
          disabled
          hideGrid
          ref={canvasRef}
          saveData={drawing}
        />
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem

