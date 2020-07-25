import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";

const PostItem = (props) => {
  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <Link to={`/posts/${props.post._id}`}>
      <img src={props.post.url} style={{ border: "1px solid red" }}></img>
      </Link>

      <a href={props.post.url} download className="btn btn-success">
        <i className="fas fa-file-download"></i> Download Image
      </a>
      {!props.auth.loading && props.post.user === props.auth.user._id && (
        <button
          className="btn btn-danger"
          onClick={(e) => props.deletePost(props.post._id)}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      )}
    </>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostItem);
