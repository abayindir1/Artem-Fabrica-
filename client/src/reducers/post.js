import {
  POST_ERROR,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  CREATE_POST,
  UPDATE_LIKE,
  COMMENT_ERROR,
  CREATE_COMMENT,
  DELETE_COMMENT
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
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
      
    case CREATE_COMMENT:
      return{
        ...state,
        post: {...state.post, comment: payload},
        loading: false,
      }
      case DELETE_COMMENT:
        return{
          ...state,
          post:{
            ...state.post,
            comment: state.post.comment.filter(comment=> comment._id !== payload)
          },
          loading: false,
        }
    case POST_ERROR:
    case COMMENT_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
}
