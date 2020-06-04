
import React, {Fragment} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {logout} from "../../actions/auth"

const Navbar = (props) =>{

    let auth = {
        isAuthenticated: props.auth.isAuthenticated,
        loading: props.auth.loading
    }

    const authLinks = (
        <ul>
                <li>
                    <a onClick={props.logout} href="#!"><i class="fas fa-running"></i> Logout</a>
                </li>
        </ul>
    )

    const enterLinks = (
        <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
    )
    return(
        <nav className="navbar">
            <h3>
                <Link to="/"><i className="fas fa-paint-brush"></i> DrawarD</Link>
            </h3>
    {!auth.loading && (<Fragment>{auth.isAuthenticated ? authLinks : enterLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    mapStateProps: PropTypes.object.isRequired,
}

const mapStateProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateProps, {logout})(Navbar)