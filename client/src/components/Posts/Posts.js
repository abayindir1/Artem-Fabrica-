import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/post";
import { setAlert } from "../../actions/alert";
import Spinner from "../Spinner/Spinner";
import PostItem from "./PostItem";
import "./Posts.css";

function Posts({getPosts, post: { posts, loading }}) {
 
    useEffect(() => {
        getPosts()
    },[])

  return (
    <div className="posts">
        {loading && !posts ? (
            <Spinner/>
        ):(
            <Fragment>
                {posts[0] && posts[0].length > 0 ? (
              posts[0].map((post) =>
              <PostItem key={post._id} post={post}/>
              )
            ) : (
              <h3>No Posts Found</h3>
            )}
            </Fragment>
        )}
    </div>
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
