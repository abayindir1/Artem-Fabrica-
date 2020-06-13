import React, { Fragment, useEffect } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getProfiles } from "../../actions/profile";

const Profiles = (props) => {
  useEffect(() => {
    console.log(props.profile.profiles);
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
                <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{profile.name}</h4>
                  <h5 className="card-subtitle">
                    From {profile.location}
                  </h5>
                  <p className="card-text">{profile.bio}</p>
                  <a href={profile.social.facebook} class="card-link"><i class="fab fa-facebook"></i> Facebook</a>
                  <a href={profile.social.instagram} class="card-link"><i class="fab fa-instagram"></i> Instagram</a>
                  <a href={profile.social.twitter} class="card-link"><i class="fab fa-twitter"></i> Twitter</a> <br/> <br/>
                  <Link to="/" className="btn btn-warning">
                    Go To Profile
                  </Link>
                </div>
              </div>
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
