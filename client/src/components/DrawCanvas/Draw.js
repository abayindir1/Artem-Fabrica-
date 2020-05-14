import React, { Component } from "react";
import { render } from "react-dom";
import CanvasDraw from "react-canvas-draw";
 
class Draw extends Component {
    
    render() {
      return (
        <div>
         <CanvasDraw
          brushColor="black"
          hideGrid
        />
        </div>
      );
    }
  }

export default Draw