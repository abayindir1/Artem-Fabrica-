import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {login} from "../../actions/auth"
import { setAlert } from "../../actions/alert";
import "./Login.css"
 
const Login = (props) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login({email, password})
  };

// Redirect if logged in
if(props.isAuthenticated){
  return <Redirect to="/"/>
}

  return (
    <Fragment>
      <div className="sign-in-form">
        <h1 className="large">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <input type="submit" className="btn btn-outline-light" value="Sign In" />
        </form>
        <p className="my-1">
          Don't have an account?{" "}
          <Link to="/register" className="btn btn-outline-light">
            Sign Up
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateProps, {setAlert, login})(Login);
