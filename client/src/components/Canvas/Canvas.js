import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SignatureCanvas from "react-signature-canvas";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

import { postCreate } from "../../actions/post";
import { setAlert } from "../../actions/alert";

import "./Canvas.css"

function Canvas(props) {
  const [url, setUrl] = useState(null);
  const [color, setColor] = useState("black");
  const [penSize, setPenSize] = useState(5);
  const canvasRef = useRef(null);

  // useEffect(()=>{
  //   console.log(url)
  // })

  const onClear = () => {
    canvasRef.current.clear();
  };

  const onSave = () => {
    setUrl(canvasRef.current.toDataURL("image/png"));
    props.postCreate(canvasRef.current.toDataURL("image/png"));
    onClear();
  };

  const onColorChange = (e) => {
    setColor(e.target.value);
  };
  const onChangeNumber = (e) => {
    setPenSize(parseInt(e.target.value));
  };

  const onEraser = () => {
    setColor("white");
  };

  const onPen = () => {
    setColor("black");
  };

  return (
    <>
    <h2>Draw Something</h2>
    <div className="drawing">
      <div className="draw-material">
        <div
          style={{
            textAlign: "center",
            border: "3px solid black",
            width: "fit-content",
            cursor: "crosshair",
            marginBottom: "3%"
          }}
        >
          <SignatureCanvas
            penColor={color}
            minWidth={penSize}
            dotSize={5}
            canvasProps={{ width: 450, height: 450, className: "sigCanvas" }}
            ref={canvasRef}
          />
        </div>
        <div className="tools">
          <button className="btn btn-danger" onClick={onClear}>
            Clear
          </button>
          <button className="btn btn-success" onClick={onSave}>
            Save
          </button>
          <button className="btn btn-light" onClick={onEraser}>
            Eraser
          </button>
          <button className="btn btn-dark" onClick={onPen}>
            Pen
          </button>

          <input
            type="color"
            id="pen"
            name="pen"
            value={color}
            style={{ width: "15%", height: "30px", margin: "0 1% " }}
            onChange={(e) => onColorChange(e)}
          />
          <label htmlFor="pen">Color</label>

          <input
            type="range"
            id="penSize"
            name="penSize"
            value={penSize}
            style={{ width: "20%" }}
            min="1"
            max="20"
            onChange={(e) => onChangeNumber(e)}
          />
          <label htmlFor="penSize">Size</label>
        </div>
      </div>
      <a href={url} download>
        <img src={url} style={{ border: "1px solid red" }}></img>
      </a>
    </div>
    </>
  );
}
Canvas.propTypes = {
  setAlert: PropTypes.func.isRequired,
  postCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { setAlert, postCreate })(Canvas);
