import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import "./Post.css"

function CommentItem({user, name, text, postId, commentId, auth, deleteComment}) {

    const [authId, setAuth] = React.useState(auth.user._id);
    React.useEffect(() => {
      }, []);

      const onDelete =(e) =>{
        e.preventDefault()
        deleteComment(postId, commentId)
        console.log(auth.user._id)
        console.log(user)
      }

    return (
        <>
        <div className="card-header comment-header">
            <h6>{name}</h6>
        </div>
        <div className="card-body comment-body">
            <p>{text}</p>
            {authId === user && (
            <button className="btn btn-danger" onClick={onDelete}>
              <i className="fas fa-trash-alt"></i>
              <br />
              Delete
            </button>
                
            )}
        </div>
        <br/>
        </>
    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  const mapStateToProps =(state)=>({
      auth: state.auth
  })

export default connect(mapStateToProps, {deleteComment})(CommentItem)

