import axios from "axios";
import {
  POST_ERROR,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  CREATE_POST,
  UPDATE_LIKE,
  CREATE_COMMENT,
  COMMENT_ERROR,
  DELETE_COMMENT
} from "./types";
import { setAlert } from "./alert";

// get posts
export const getPosts = () => async (dispatch) => {
  try {
    await axios.get("/api/posts").then((response) => {
      // console.log(response)
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    await axios.get(`/api/posts/${id}`).then((response) => {
      // console.log(response)
      dispatch({
        type: GET_POST,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`).then((response) => {
      console.log(response);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      dispatch(setAlert("Post Deleted", "success"));
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};
// like a post
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    // console.log(res)
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};

// unlike a post
export const unLikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    // console.log(res)
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};

// create post
export const postCreate = (url) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    var body = {
      url: url,
    };
    //  console.log(JSON.stringify(url))
    await axios.post("/api/posts", body, config).then((response) => {
      console.log(response);
      dispatch({
        type: CREATE_POST,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response },
    });
  }
};

// Create comment
export const createComment = (id, text) => async(dispatch) =>{
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body ={
      text: text
    }
    console.log(text)
    await axios.post(`/api/posts/comment/${id}`,body, config).then(response=>{
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data,
      });
      dispatch(setAlert("Comment Added", "success"));
    })
  } catch (error) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: error.response },
    });
  }
}

// Delete comment
export const deleteComment = (id, commentId) => async(dispatch) =>{
  try {
    await axios.delete(`/api/posts/comment/${id}/${commentId}`).then(response=>{
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert("Comment Deleted", "success"));
    })
  } catch (error) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: error.response },
    });
  }
}
