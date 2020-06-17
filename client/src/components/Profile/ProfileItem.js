import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = (props) => {
  // useEffect(() => {
  //   // console.log(props);
  // });
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.profile.name}</h4>
        <h5 className="card-subtitle">From {props.profile.location}</h5>
        <p className="card-text">{props.profile.bio}</p>
        <a href={props.profile.social.facebook} className="card-link">
          <i className="fab fa-facebook"></i> Facebook
        </a>
        <a href={props.profile.social.instagram} className="card-link">
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a href={props.profile.social.twitter} className="card-link">
          <i className="fab fa-twitter"></i> Twitter
        </a>{" "}
        <br /> <br />
        <Link
          to={`/profile/` + props.profile.user._id}
          className="btn btn-warning"
        >
          Go To Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
