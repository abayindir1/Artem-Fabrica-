import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";
import { likePost } from "../../actions/post";
import { unLikePost } from "../../actions/post";

const PostItem = (props) => {
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(props.post.likes.length);

  React.useEffect(() => {
    if(props.auth.user._id && props.post.likes.filter(like=> like.user === props.auth.user._id)){
      setLiked(true)
    }else{
      setLiked(false)
    }
    
  },[]);

  const onDelete = () =>{
    props.deletePost(props.post._id)
    window.location.reload(false);
  }

  const onLike =()=>{
    if(!liked){
      props.likePost(props.post._id)
      setLiked(true)
      setLikes(props.post.likes.length++)
      console.log(likes)
      console.log(props.post.likes.length)
    }else{
      props.unLikePost(props.post._id)
      setLiked(false)
      setLikes(props.post.likes.length--)
      console.log(likes)
      console.log(props.post.likes.length)
    }
    console.log(liked)
  }
  return (
    <>
      <Link to={`/posts/${props.post._id}`}>
      <img src={props.post.url} style={{ border: "1px solid red" }}></img>
      </Link>

      <a href={props.post.url} download className="btn btn-success">
        <i className="fas fa-file-download"></i> Download Image
      </a>

      <button className="btn btn-light" onClick={onLike}>
      <i className="far fa-heart"></i> {props.post.likes.length}
      </button>  

      {!props.auth.loading && props.post.user === props.auth.user._id && (
        <button
          className="btn btn-danger"
          onClick={onDelete}
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
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likePost, unLikePost, deletePost })(PostItem);
