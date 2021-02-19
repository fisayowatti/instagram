import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USERS_STATE_CHANGE,
} from "../constants";

const initialState = {
  currentUser: null,
  allUsers: [],
  posts: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USERS_STATE_CHANGE:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
