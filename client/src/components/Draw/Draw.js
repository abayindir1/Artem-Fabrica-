import React, { Fragment, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const Draw = (props) => {
  const [formData, setFormData] = React.useState({
    postText: "",
    color: "",
    brushRadious: 5,
  });
  const {postText,  color, brushRadious } = formData;

  const canvasRef = useRef(null);

  const onSave = () => {
    var DrawData = canvasRef.current.getSaveData();
    console.log(postText)
    console.log(DrawData)
}


  const onClear = () => {
    canvasRef.current.clear();
  };

  const onUndo = () => {
    canvasRef.current.undo();
  };
  return (
    <Fragment>
      <form>
        <div className="form-group">
          <input
            type="postText"
            placeholder="Tell something about this work"
            name="postText"
            value={postText}
            onChange={(e)=>{setFormData({ ...formData, [e.target.name]: e.target.value });}}
          ></input>
        </div>
      </form>
      <CanvasDraw
        canvasWidth={400}
        canvasHeight={400}
        style={{ border: "3px solid red" }}
        ref={canvasRef}
      />

      <button className="btn btn-success" onClick={onSave}>
        Save
      </button>
      <button className="btn btn-warning" onClick={onUndo}>
        Undo
      </button>
      <button className="btn btn-danger" onClick={onClear}>
        Clear
      </button>
    </Fragment>
  );
};

export default Draw;
