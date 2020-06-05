import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { body } from "express-validator";

const CreateProfile = (props) => {
  const [formData, setFormData] = React.useState({
    bio: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const { bio, location, facebook, instagram, twitter } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <div className="sign-in-form">
        <h2>
          <i class="fas fa-id-card"></i> Create A Profile
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
            <select
              type="location"
              placeholder="Your Location (Optional)"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
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
            value="Create"
          />
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default connect()(CreateProfile);
