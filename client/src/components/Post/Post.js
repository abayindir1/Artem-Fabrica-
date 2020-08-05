import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { createComment } from "../../actions/post";
import Spinner from "../Spinner/Spinner";
import CommentArea from "./CommentArea";
import CommentItem from "./CommentItem";
import "./Post.css"

const Post = ({ getPost, post, match}) => {
  useEffect(() => {
    getPost(match.params.id);
    console.log(post)
  }, []);

  return (
    <>
    
      {post.loading && !post.post ? (
        <Spinner />
      ) : (
          <div>
          <h3 style={{marginTop: "3%"}}>{post.post.name && (post.post.name)}</h3>
          <img
          src={post.post.url}
          style={{ border: "1px solid red" }}
          ></img>
          <CommentArea postId={match.params.id} />
          {post.post.comment.length > 0 ? (
            post.post.comment.map((comment) => (
              <CommentItem
              key={comment._id}
              name={comment.name}
              text={comment.text}
              postId={post.post._id}
              commentId={comment._id}
              user={comment.user}
              />
              ))
              ) : (
                <h3>No Comments</h3>
                )}
        </div>
      )}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  createComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPost, createComment })(Post);
