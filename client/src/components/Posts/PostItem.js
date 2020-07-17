import React,{useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import CanvasDraw from "react-canvas-draw"

function PostItem(props) {
     const [drawing, setDrawing] = useState({})

     const canvasRef = useRef(null);

    useEffect(() => {
        const drawingData = props.post.drawing

        setDrawing(JSON.stringify(drawingData))

        for(let i=0; i<drawingData.lines.lenght; i++){
            excludeId(drawingData.lines[i].points)
        }
        console.log(drawingData)
    },[]);

    const excludeId = (point) =>{
        point.forEach(element => {
            delete element._id
        });
    }
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

