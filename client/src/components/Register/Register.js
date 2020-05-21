import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert"
import PropTypes from 'prop-types'


const Register = (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("Passwords do not match", "danger");
    } else {
      console.log("bum");
    }
  };

  return (
    <Fragment>
      <div className="register-form">
        <h1 className="large">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-outline-light" value="Register" />
        </form>
        <p className="my-1">
          Already have an account?{" "}
          <Link to="/login" className="btn btn-outline-light">
            Sign In
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);
