import React, { Fragment, useEffect } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "../Profile/ProfileItem";

const Profiles = (props) => {
  useEffect(() => {
    console.log(props.profile);
    props.getProfiles();
  }, []);
  return (
    <Fragment>
      {props.profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Artists</h1>
          <h5>You can see all the creators here</h5>
          <div className="profiles">
            {props.profile.profiles.length > 0 ? (
              props.profile.profiles.map((profile) =>
                <ProfileItem key={profile._id} profile={profile}/>
              )
            ) : (
              <h3>No Profiles Found</h3>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
