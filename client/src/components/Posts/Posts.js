import React, {useEffect} from 'react'

import PropTypes from 'prop-types'
import {getPosts} from "../../actions/post"
import {connect} from "react-redux"
import PostItem from "./PostItem"


function Posts(props) {
    
    useEffect(() => {
        props.getPosts()
        console.log(props)
    },[])

    return (
            <div>
            {props.post.posts.length > 0 ? (
              props.post.posts.map((post) =>
              // console.log(post)
                <PostItem key={post._id} post={post}/>
              )
            ) : (
              <h3>No Posts Found</h3>
             )} 
        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
   return {post: state.post} ;
};

export default connect(mapStateToProps, {getPosts})(Posts)

