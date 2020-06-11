import axios from "axios";
import { PROFILE_ERROR, GET_PROFILE, DELETE_ACCOUNT, GET_PROFILES, CLEAR_PROFILE, UPDATE_PROFILE} from "./types";
import { setAlert } from "./alert";

// Get Current user's profile
export const getCurrentProfile = () => async dispatch =>{
    
    try {
       await axios.get("/api/profile/me").then(response=>{
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

// Get all the Profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    try {
       
       await axios.get("/api/profile").then(response=>{
            dispatch({
                type: GET_PROFILES,
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


// Get profile by id
export const getProfileById = (userID) => async dispatch =>{
    
    try {
       
       await axios.get("/api/profile").then(response=>{
            dispatch({
                type: GET_PROFILES,
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
                type: UPDATE_PROFILE,
                payload: response.data
            })

            dispatch(setAlert(!edit ? "Profile Updated" : "Profile Created", "success"))

            
                history.push("/dashboard")
        })
    } catch (error) {
        const errors = error.response.data.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Delete account, profile and posts of the user
export const deleteUser =() => async dispatch =>{
    if(window.confirm("Are you sure to delete your account with your profile and posts?")){

        try {
            await axios.delete("/api/profile").then((res)=>{
                dispatch({
                    type: DELETE_ACCOUNT
                })
                dispatch(setAlert("Your account has ben deleted.", "success"))
            })
        } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        }
    }
}