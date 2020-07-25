import {
  POST_CREATE,
  POST_ERROR,
  GET_POSTS,
  DELETE_POST,
  GET_POST
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [payload],
        loading: false,
      };
      case GET_POST:
          return{
              ...state,
              post: payload,
              loading: false
          }
      case DELETE_POST:
          return{
              ...state,
              posts: state.posts.filter(post=> post.id !== payload),
              loading: false
          }
    case POST_CREATE:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
}
