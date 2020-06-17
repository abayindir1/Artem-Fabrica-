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
      {props.profile === null || props.profile.loading ? (
        <Spinner />
      ) : (
        <div>
            <p>Test {props.profile.profile.name} Test2</p>
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