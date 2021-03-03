import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USERS_STATE_CHANGE,
  USER_FOLLOWING_LIST_CHANGE,
  USER_FOLLOWING_POSTS_CHANGE,
} from "../constants";

const initialState = {
  currentUser: null,
  allUsers: [],
  posts: [],
  userFollowingList: [],
  userFollowingPosts: [],
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
    case USER_FOLLOWING_LIST_CHANGE:
      return {
        ...state,
        userFollowingList: action.userFollowingList,
      };
    case USER_FOLLOWING_POSTS_CHANGE:
      return {
        ...state,
        userFollowingPosts: [...state.userFollowingPosts, ...action.posts],
      };
    default:
      return state;
  }
};
