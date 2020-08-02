import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Posts from "../Posts/Posts" 


const Home = (props) => {
  useEffect(() => {
    // console.log(props.profile.profile)
  }, []);


  return props.auth.loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="home-welcome">
        <h3>
          <i className="far fa-smile-beam"></i> Hello{" "}
          {props.auth.user && props.auth.user.name}
        </h3>
          <Fragment>
                <Posts/>
                {/* <Link to="/posts" className="btn btn-dark">
                  Posts
                </Link> */}
          </Fragment>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,)(
  Home
);
