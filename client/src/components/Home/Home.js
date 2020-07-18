import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { deleteUser } from "../../actions/profile";
import Spinner from "../Spinner/Spinner";


const Home = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
    // console.log(props.profile.profile)
  }, []);

  const DeleteAccount = () => {
    props.deleteUser();
  };

  return props.profile.loading && props.profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="home-welcome">
        <h3>
          <i className="far fa-smile-beam"></i> Hello{" "}
          {props.auth.user && props.auth.user.name}
        </h3>
        {props.profile.profile !== null ? (
          <Fragment>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{props.profile.profile.name}</h4>
                <h5 className="card-subtitle">
                  From {props.profile.profile.location}
                </h5>
                <p className="card-text">{props.profile.profile.bio}</p>
                <a href={props.profile.profile.social.facebook} className="card-link"><i className="fab fa-facebook"></i> Facebook</a>
                <a href={props.profile.profile.social.instagram} className="card-link"><i className="fab fa-instagram"></i> Instagram</a>
                <a href={props.profile.profile.social.twitter} className="card-link"><i className="fab fa-twitter"></i> Twitter</a> <br/> <br/>
                <Link to="/edit-profile" className="btn btn-warning">
                  Edit Profile
                </Link>
                <button className="btn btn-danger" onClick={DeleteAccount}>
                  Delete Your Account
                </button>
                <Link to="/canvas" className="btn btn-primary">
                  Draw
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>Looks like you don't have a profile yet.</p>
            <Link to="/create-profile" className="btn btn-light">
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>

      
    </Fragment>
  );
};

Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteUser })(
  Home
);
