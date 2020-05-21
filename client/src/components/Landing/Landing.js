import React from 'react';
import {Link} from "react-router-dom"

import Login from "../Login/Login"
import Register from "../Register/Register"

const Landing = () =>{
    return(
        <section className="landing">
            <div className="container landing-content">
                    <h1 className="x-large">DrawarD</h1>
                    <p className="lead">
                        Create a piece of art and share with others. Join now!
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-outline-light">Sign Up</Link>
                        <Link to="/login" className="btn btn-outline-light">Login</Link>
                    </div>
            </div>
        </section>
    )
}

export default Landing