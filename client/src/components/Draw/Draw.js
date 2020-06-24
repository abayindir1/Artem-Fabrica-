import React, { Fragment, useRef} from "react";
import CanvasDraw from "react-canvas-draw";

const Draw = (props) => {
    const [formData, setFormData] = React.useState({
        color: "",
        brushRadious: 5
      });
      const { color, brushRadious } = formData;

      const canvasRef = useRef(null)

      const onSave =() =>{
            var data = canvasRef.current.getSaveData()
            console.log(data)
      }

      const onClear= () =>{
          canvasRef.current.clear()
      }

      const onUndo= () =>{
        canvasRef.current.undo()
    }
  return (
    <Fragment>
      <CanvasDraw canvasWidth={400} canvasHeight={400}
       style={{border: '3px solid red'}} ref={canvasRef}/>

       <button className="btn btn-success" onClick={onSave}>Save</button>
       <button className="btn btn-warning" onClick={onUndo}>Undo</button>
       <button className="btn btn-danger" onClick={onClear}>Clear</button>
    </Fragment>
  );
};

export default Draw;
