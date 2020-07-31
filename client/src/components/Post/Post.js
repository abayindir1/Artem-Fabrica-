import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { deletePost } from "../../actions/post";
import Spinner from "../Spinner/Spinner";

const Post = (props) => {
  useEffect(() => {
    props.getPost(props.match.params.id);
    console.log(props);
  }, [props.getPost]);

  const onDelete = () => {
    props.deletePost(props.post.post._id);
    return <Redirect to="/posts" />;
  };
  return (
    <>
      {props.post.loading || props.post.post.url == null ? (
        <Spinner />
      ) : (
        // console.log(props.post.post.url)
        <div>
          <img
            src={props.post.post.url}
            style={{ border: "1px solid red" }}
          ></img>
          <a href={props.post.post.url} download className="btn btn-success">
            <i className="fas fa-file-download"></i>Download
          </a>
          <button className="btn btn-success">
            <i class="far fa-heart"></i>
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      )}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPost, deletePost })(Post);
