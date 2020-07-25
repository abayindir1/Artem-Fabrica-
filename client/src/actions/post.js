import axios from "axios";
import { POST_CREATE, POST_ERROR, GET_POSTS} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";




// get posts
export const getPosts = () => async(dispatch)=>{
  try {
    await axios.get("/api/posts").then((response=>{
      console.log(response)
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
      console.log(error.response)
      dispatch({
        type: POST_ERROR,
        payload:{msg: error.response.statusText, status: error.response.status}
      })
    }
  }

