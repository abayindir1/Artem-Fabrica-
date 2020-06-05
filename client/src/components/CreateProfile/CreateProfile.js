import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import { body } from 'express-validator'

const CreateProfile = props => {
    const[formData, setFormData] = React.useState({
        bio: "",
        location: "",
        facebook: "",
        instagram: "",
        twitter:""
    }) 

    const {bio, location, facebook, instagram, twitter} = formData

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        console.log(formData)
    }


    return (
        <Fragment>
      <div className="sign-in-form">
        <h1 className="lead">
          <i className="fas fa-user"></i> Create A Profile
        </h1>
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
            <input
              type="location"
              placeholder="Your Location (Optional)"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div><div className="form-group">
            <input
              type="facebook"
              placeholder="Facebook Link (Optional)"
              name="facebook"
              value={facebook}
              onChange={(e) => onChange(e)}
            />
          </div><div className="form-group">
            <input
              type="instagram"
              placeholder="Instagram Link (Optional)"
              name="instagram"
              value={instagram}
              onChange={(e) => onChange(e)}
            />
          </div><div className="form-group">
            <input
              type="twitter"
              placeholder="Twitter Link (Optional)"
              name="twitter"
              value={twitter}
              onChange={(e) => onChange(e)}
            />
          </div>
          
          <input type="submit" className="btn btn-outline-light" value="Create" />
        </form>
      </div>
    </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default connect()(CreateProfile)
