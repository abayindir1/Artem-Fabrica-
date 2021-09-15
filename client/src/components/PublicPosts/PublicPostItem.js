import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../Posts/Posts.css";
import Spinner from "../Spinner/Spinner";

const PostItem = (props) => {
  return (
    <>
      {!props.post && props.post.loading ? (
        <Spinner />
      ) : (
        <div className="card">
            <img
              src={props.post.url}
              style={{ border: `2px solid #161b21` }}
              className="card-img-top"
            ></img>
          <div className="card-body">
            <h5 className="card-title">{props.post.name}</h5>
          </div>
        </div>
      )}
    </>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  PostItem
);
