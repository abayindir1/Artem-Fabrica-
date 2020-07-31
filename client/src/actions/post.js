import axios from "axios";
import {POST_ERROR, GET_POSTS, DELETE_POST, GET_POST, CREATE_POST, UPDATE_LIKE} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { body } from "express-validator";




// get posts
export const getPosts = () => async(dispatch)=>{
  try {
    await axios.get("/api/posts").then((response=>{
      // console.log(response)
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    }))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response.statusText, status: error.response.status}
    })
  }
}

export const getPost = (id) => async(dispatch)=>{
  try {
    await axios.get(`/api/posts/${id}`).then((response=>{
      // console.log(response)
      dispatch({
        type: GET_POST,
        payload: response.data,
      });
    }))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response.statusText, status: error.response.status}
    })
  }
}

export const deletePost = (id) => async(dispatch)=>{
  try {
    await axios.delete(`/api/posts/${id}`).then(response=>{
      console.log(response)
      dispatch({
        type: DELETE_POST,
        payload: id
      })

      dispatch(setAlert("Post Deleted", "success"))
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response.statusText, status: error.response.status}
    })
  }
}
// like a post
export const likePost = (id) => async(dispatch)=>{
  try {
    console.log(id)
     const res = await axios.put(`/api/posts/like/${id}`)
      // console.log(res)
      dispatch({
        type: UPDATE_LIKE,
        payload: { id , likes: res.data}
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response.statusText, status: error.response.status}
    })
  }
}

// unlike a post
export const unLikePost = (id) => async(dispatch)=>{
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)
      // console.log(res)
      dispatch({
        type: UPDATE_LIKE,
        payload: { id , likes: res.data}
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response.statusText, status: error.response.status}
    })
  }
}

// create post
export const postCreate = (url) => async(dispatch)=>{
  try {
   const config = {
     headers:{
       'Content-Type':"application/json"
     }
   }

   var body = {
     url: url
   }
  //  console.log(JSON.stringify(url))
    await axios.post("/api/posts", body, config).then(response=>{
      dispatch({
        type: CREATE_POST,
        payload: response.data
      })
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload:{msg: error.response, status: error.response.status}
    })
  }
}
