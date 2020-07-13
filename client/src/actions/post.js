import axios from "axios";
import { POST_CREATE, POST_ERROR, GET_POSTS } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// post create
export const postCreate = (drawing) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/posts", drawing, config).then((response) => {
      console.log(response.data);
      dispatch({
        type: POST_CREATE,
        payload: response.data,
      });
      // console.log(drawing)

      dispatch(setAlert("Post Created", "success"));
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error,
      },
    });
  }
};

// Get posts
export const getPosts = () => async (dispatch)=>{
  try {
    await axios.get("/api/posts").then((response) =>{
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error,
      },
    });
  }
}

