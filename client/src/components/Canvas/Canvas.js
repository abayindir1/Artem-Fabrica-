import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SignatureCanvas from "react-signature-canvas";

function Canvas(props) {

  const [url, setUrl] = useState(null);
  const [color, setColor] = useState("black");
  const [penSize, setPenSize] = useState(5)
  const canvasRef = useRef(null)

  const onClear = () => {
    canvasRef.current.clear()
  }

  const onSave = () =>{
    // console.log(canvasRef.current.toDataURL("image/png"))
    setUrl(canvasRef.current.toDataURL("image/png"))
  }

  const onChange = (e) => {
    setColor(e.target.value);
  };
  const onChangeNumber = (e) => {
    setPenSize(parseInt(e.target.value));
  };

  return (
    <>
    <div style={{textAlign:"center", border:"3px solid black", width:"fit-content", cursor:"crosshair"}}>
      <SignatureCanvas
        penColor={color}
        minWidth={penSize}
        dotSize={5}
        canvasProps={{ width: 500, height: 500,  className: "sigCanvas",}}
        ref={canvasRef}
        
      />
    </div>
      <button className="btn btn-danger" onClick={onClear}>Clear</button>
      <button className="btn btn-success" onClick={onSave}>Save</button>
      
      <input type="color" id="pen" name="pen"
           value={color} style={{width: "5%", height: "30px"}}
           onChange={(e)=> onChange(e)}/>
    <label htmlFor="pen">Pen Color</label>

    <input type="range" id="penSize" name="penSize"
           value={penSize} style={{width: "10%"}}
           min="1" max="15"
           onChange={(e)=> onChangeNumber(e)}/>
    <label htmlFor="penSize">Pen Size</label>

      <a href={url} download>
      <img src={url} style={{border: "1px solid red"}}></img>
      </a>
      </>
  );
}
Canvas.propTypes = {};

export default Canvas;
