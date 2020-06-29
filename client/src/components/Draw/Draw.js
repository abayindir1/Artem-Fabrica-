import React, { Fragment, useRef, useState } from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import CanvasDraw from "react-canvas-draw";

import {postCreate} from "../../actions/post" 
import { setAlert } from "../../actions/alert";

const Draw = (props) => {
  const [formData, setFormData] = React.useState({
    postText: "",
    color: "",
    brushRadious: ""
  });

  const { postText, color, brushRadious } = formData;

  const canvasRef = useRef(null);

  const onSave = () => {
    var drawing = canvasRef.current.getSaveData();
    var drawingData = JSON.parse(drawing)
    console.log(drawingData)
    // console.log(postText)
    props.postCreate(drawingData)
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
            onChange={(e)=> setFormData({ ...formData, [e.target.name]: e.target.value })}
          ></input>
        </div>
      </form>
      <CanvasDraw
        canvasWidth={300}
        color="#000000"
        canvasHeight={300}
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

Draw.propTypes = {
    setAlert: PropTypes.func.isRequired,
    postCreate: PropTypes.func.isRequired,
  }

  
export default connect(null, {setAlert, postCreate})(Draw);
