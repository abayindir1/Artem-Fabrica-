import React, { Fragment, useRef, useState } from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import CanvasDraw from "react-canvas-draw";

import {postCreate} from "../../actions/post" 
import { setAlert } from "../../actions/alert";

const Draw = (props) => {
  
 const [postText, setPostText] = useState("");
 const [color, setColor] = useState("");
 const [brushRadious, setbrushRadious] = useState(5);

  const canvasRef = useRef(null);

  const onSave = () => {
    var DrawData = canvasRef.current.getSaveData();
    console.log(DrawData)

    props.postCreate({postText, DrawData})
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
            onChange={(e)=>setPostText(e.target.value)}
          ></input>
        </div>
      </form>
      <CanvasDraw
        canvasWidth={400}
        color="#000000"
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

Draw.propTypes = {
    setAlert: PropTypes.func.isRequired,
    postCreate: PropTypes.func.isRequired,
  }

  
export default connect(null, {setAlert, postCreate})(Draw);
