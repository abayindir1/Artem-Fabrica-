import axios from "axios";
import { POST_CREATE, POST_ERROR } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// post create
export const postCreate = (DrawData, text, draw, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ text, draw });
    console.log("before call");
    await axios.post("/api/posts", body, config).then((response) => {
        console.log("after call");
      dispatch({
        type: POST_CREATE,
        payload: response.data,
      });

      dispatch(setAlert("Post Created", "success"));

      history.push("/home");
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response,
      },
    });
  }
};
