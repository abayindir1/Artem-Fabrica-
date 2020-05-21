
import React from 'react';
import {Link} from "react-router-dom"

const Navbar = () =>{
    return(
        <nav className="navbar">
            <h3>
                <Link to="/"><i className="fas fa-paint-brush"></i> DrawarD</Link>
            </h3>
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar