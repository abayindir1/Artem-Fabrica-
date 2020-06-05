import React from 'react';
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from "prop-types"


const Landing = (props) =>{
    if(props.isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return(
        <section className="landing">
            <div className="container landing-content">
                    <h1 className="x-large">Artem Fabrica</h1>
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

Landing.propTypes ={
    isAuthenticated: PropTypes.bool
}

const mapStateToProps =(state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)