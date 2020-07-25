import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/post";
import { setAlert } from "../../actions/alert";
import Spinner from "../Spinner/Spinner";
import PostItem from "./PostItem";

function Posts(props) {
    useEffect(() => {
        props.getPosts()
        console.log(props)
    },[])

  return (
    <Fragment>
        {props.post.loading ? (
            <Spinner/>
        ):(
            <Fragment>
                <h1>Posts</h1>
                <div>
                {props.post.posts.length > 0 ? (
              props.post.posts[0].map((post) =>
              <PostItem key={post._id} post={post}/>
              )
            ) : (
              <h3>No Profiles Found</h3>
            )}
                </div>
            </Fragment>
        )}
    </Fragment>
  );
}

Posts.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
  });

export default connect(mapStateToProps, {setAlert, getPosts})(Posts);
