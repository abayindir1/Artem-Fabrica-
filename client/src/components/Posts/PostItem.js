import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostItem = (props) => {

    React.useEffect(() => {
        console.log(props)
    }, [])
  return (
    <a href={props.post.url} download>
      <img src={props.post.url} style={{border: "1px solid red"}}></img>
      </a>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
