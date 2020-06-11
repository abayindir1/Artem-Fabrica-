import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { body } from "express-validator";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = (props) => {
  const [formData, setFormData] = React.useState({
    bio: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const { bio, location, facebook, instagram, twitter } = formData;

  useEffect(()=>{
    getCurrentProfile();
    console.log(props.profile)
  },[])
  useEffect(() => {
    setFormData({
      bio: props.profile.loading || !props.profile.profile.bio ? " " : props.profile.profile.bio,
      location: props.profile.loading || !props.profile.profile.location ? " " : props.profile.profile.location,
      facebook: props.profile.loading || !props.profile.profile.social.facebook ? " " : props.profile.profile.social.facebook,
      instagram: props.profile.loading || !props.profile.profile.social.instagram ? " " : props.profile.profile.social.instagram,
      twitter: props.profile.loading || !props.profile.profile.social.twitter ? " " : props.profile.profile.social.twitter,
    });
  }, [props.profile.loading]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.createProfile(formData, props.history);
  };

  return (
    <Fragment>
      <div className="sign-in-form">
        <h2>
          <i className="far fa-id-card"></i> Edit Your Profile
        </h2>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="bio"
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="states">Choose Your State:</label>
            <select
              type="location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled defaultValue>Select your state</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="District Of Columbia">
                  District Of Columbia
                </option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
            </select>
          </div>
          <div className="form-group">
            <h4>Social Media Links (Optional)</h4>
            <input
              type="facebook"
              placeholder="Facebook Link "
              name="facebook"
              value={facebook}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="instagram"
              placeholder="Instagram Link "
              name="instagram"
              value={instagram}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="twitter"
              placeholder="Twitter Link "
              name="twitter"
              value={twitter}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input
            type="submit"
            className="btn btn-outline-light"
            value="Edit"
          />
        </form>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
