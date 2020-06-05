import React, {Fragment} from "react"
import spinner from "../../images/3.gif"

export default ()=>(
    <Fragment>
        <img 
        src={spinner} 
        style={{width:"50px", margin:"auto", marginTop:"10rem", display:"block"}}
        alt="Loading"
        />
    </Fragment>
)