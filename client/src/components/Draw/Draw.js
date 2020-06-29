import React, { Fragment, useRef, useState } from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import CanvasDraw from "react-canvas-draw";

import {postCreate} from "../../actions/post" 
import { setAlert } from "../../actions/alert";

const Draw = (props) => {
  const [formData, setFormData] = React.useState({
    color: "",
    brushRadious: ""
  });

  const { postText, color, brushRadious } = formData;

  const canvasRef = useRef(null);

  const onSave = () => {
    const drawing = canvasRef.current.getSaveData();
    props.postCreate(drawing)
}

  const onClear = () => {
    canvasRef.current.clear();
  };

  const onUndo = () => {
    canvasRef.current.undo();
  };

  return (
    <Fragment>
      <CanvasDraw
        canvasWidth={1000}
        color="#000000"
        canvasHeight={500}
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
