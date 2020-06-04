import axios from "axios";
import { PROFILE_ERROR, GET_PROFILE } from "./types";
import { setAlert } from "./alert";

// Get Current user's profile
export const getCurrentProfile = () => async dispatch =>{
    
    try {
        const res = axios.get("/api/profile/me").then(response=>{
            console.log(response.data)
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}