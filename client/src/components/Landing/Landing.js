import React from 'react';
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./Landing.css"


const Landing = (props) =>{
    if(props.isAuthenticated){
        return <Redirect to="/home"/>
    }

    return(
        <section className="landing">
            <div className="container landing-content">
                    <h1 className="x-large">Artem Fabrica</h1>
                    <p className="lead">
                        DRAW AND SHARE WITH OTHERS
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn">Sign Up</Link>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
            </div>
        </section>
    )
}

Landing.propTypes ={
    isAuthenticated: PropTypes.bool
}

const mapStateToProps =(state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)