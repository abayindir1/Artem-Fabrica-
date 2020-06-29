import axios from "axios";
import { POST_CREATE, POST_ERROR, POST_LOAD } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// post create
export const postCreate = ({text, drawing}) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(text, drawing)
    // console.log("before call");
    await axios.post("/api/posts", text, drawing, config).then((response) => {
        console.log(response.data);
      dispatch({
        type: POST_CREATE,
        payload: response.data,
      });

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

