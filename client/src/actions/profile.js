import axios from "axios";
import { PROFILE_ERROR, GET_PROFILE } from "./types";
import { setAlert } from "./alert";

// Get Current user's profile
export const getCurrentProfile = () => async dispatch =>{
    
    try {
        const res = axios.get("/api/profile/me").then(response=>{
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

// Create/Update Profile
export const createProfile = (formData, history, edit=false) =>async dispatch =>{
    try {
        const config ={
            headers:{
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post("/api/profile", formData, config).then(response=>{
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })

            dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))

            if(!edit){
                history.push("/dashboard")
            }
        })
    } catch (error) {
        const errors = error.response.data.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}