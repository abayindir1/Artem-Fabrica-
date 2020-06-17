import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = (props) => {
  useEffect(() => {
      props.getProfileById(props.match.params.id);
      console.log(props.profile);
    },[getProfileById, props.match.params.id]);
  return (
    <Fragment>
      {props.profile.profile === null || props.profile.profile.loading ? (
        <Spinner />
      ) : (
        <div className="card">
      <div className="card-body">
      <h4 className="card-title">{props.profile.profile.name}</h4>
        <h5 className="card-subtitle">From {props.profile.profile.location}</h5>
        <p className="card-text">{props.profile.profile.bio}</p>
        {props.profile.profile.social.facebook ? <a href={props.profile.profile.social.facebook} className="card-link">
          <i className="fab fa-facebook"></i> Facebook
        </a> : <a href={null}><i className="fab fa-facebook"></i> Facebook </a>}
        {props.profile.profile.social.instagram ? <a href={props.profile.profile.social.instagram} className="card-link">
          <i className="fab fa-instagram"></i> Instagram
        </a> : <a href={null}><i className="fab fa-instagram"></i> Instagram </a>}
        {props.profile.profile.social.twitter ? <a href={props.profile.profile.social.twitter} className="card-link">
          <i className="fab fa-twitter"></i> Twitter
        </a> : <a href={null}><i className="fab fa-twitter"></i> Twitter </a>}
      </div>
    </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profile);