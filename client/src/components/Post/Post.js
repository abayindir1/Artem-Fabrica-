import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux" 
import{ getPost } from "../../actions/post"
import Spinner from "../Spinner/Spinner"

const Post = props => {

    useEffect(()=>{
        props.getPost(props.match.params.id);
        console.log(props)
    },[props.getPost])
    return (
        <>
        {props.post.loading || props.post.post.url == null ? (
            <Spinner/>
        ):(
            // console.log(props.post.post.url)
             <div>
                <img src={props.post.post.url} style={{ border: "1px solid red" }}></img>   
                <a href={props.post.post.url} download className="btn btn-success"> <i className="fas fa-file-download"></i>Download</a>
            </div> 
            
        )}
    </>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps =(state)=>({
    post: state.post,
})
export default connect(mapStateToProps, {getPost})(Post)
