import React, { Fragment, useEffect } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = props => {

    useEffect(()=>{
        console.log(props)
        props.getProfileById(props.match.params.id)
    },[getProfileById])
    return (
        <h1>Bum</h1>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
