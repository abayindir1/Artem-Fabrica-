import {
    POST_CREATE,
    POST_ERROR
} from "../actions/types"

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action){
    const {type, payload} = action

    switch (type) {
        case POST_CREATE:
            return {
            ...state,
            post: payload,
            loading: false    
            }
        case POST_ERROR:
            return{
                ...state,
                errors: payload
            }    
    
        default:
            return state
    }
} 