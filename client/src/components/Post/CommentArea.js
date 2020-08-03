import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import { createComment } from "../../actions/post";
import "./Post.css"

function CommentArea(props) {
    const [text, setText] = React.useState("");

    const onSubmit =(e)=>{
        e.preventDefault()
        props.createComment(props.postId, text)
        setText("")
    }

    const onChange =(e)=>{
        e.preventDefault()
        setText(e.target.value)
    }
    return (
        <div>
            <form
            onSubmit={onSubmit}
            >
                <textarea name="comment"
                placeholder="Leave a comment..."
                value={text}
                onChange={onChange}
                required />
                <input type="submit" className="btn btn-success" value="Submit"/>
            </form>
        </div>
    )
}

CommentArea.propTypes = {
    createComment: PropTypes.func.isRequired,
}

export default connect(null, {createComment})(CommentArea)

