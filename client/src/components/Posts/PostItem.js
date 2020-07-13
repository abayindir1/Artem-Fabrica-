import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import CanvasDraw from "react-canvas-draw"

function PostItem(props) {
     const [drawing, setDrawing] = useState({})

    useEffect(() => {
        const drawingString = JSON.stringify(props.post.drawing)
        setDrawing(drawingString)
        console.log(drawing)
    });
    return (
        <div>
            {/* <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={drawing}
        /> */}
        </div>
    )
}

PostItem.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default PostItem

