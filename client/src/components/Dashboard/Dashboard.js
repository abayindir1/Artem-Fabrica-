import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getCurrentProfile} from "../../actions/profile"
import spinner from "../Spinner/Spinner"
import Spinner from '../Spinner/Spinner'


const Dashboard = (props) => {
    console.log(props.profile)
    useEffect(() => {
        props.getCurrentProfile()
    }, [])

    return props.profile.loading && props.profile.profile === null ? <Spinner/> : <Fragment>Test</Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
