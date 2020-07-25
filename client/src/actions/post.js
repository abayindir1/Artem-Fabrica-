import axios from "axios";
import { POST_CREATE, POST_ERROR, GET_POSTS, DELETE_POST, GET_POST} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";




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

// post create
  export const postCreate = (url) => async (dispatch)=>{
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const res = await axios.post("/api/posts", url)

      console.log(res)
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload:{msg: error.response.statusText, status: error.response.status}
      })
    }
  }

