import {
    POST_CREATE
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
    
        default:
            return state
    }
} 