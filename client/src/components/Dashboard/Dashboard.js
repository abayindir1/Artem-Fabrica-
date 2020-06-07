import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../Spinner/Spinner";

const Dashboard = (props) => {
  
  useEffect(() => {
    props.getCurrentProfile();
    // console.log(props.profile.profile)
  }, []);

  return props.profile.loading && props.profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="dashboad-welcome">
        <h3>
          <i className="far fa-smile-beam"></i> Hello{" "}
          {props.auth.user && props.auth.user.name}
        </h3>
        {props.profile.profile !== null ? (
          <Fragment>
            <Link to="/edit-profile" className="btn btn-light">
              Edit Profile
            </Link>
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
