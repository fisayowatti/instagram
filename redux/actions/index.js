import { firestore } from "../../firebase";
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USERS_STATE_CHANGE,
  USER_FOLLOWING_LIST_CHANGE,
  USER_FOLLOWING_POSTS_CHANGE,
} from "../constants/index";
// import firebase from "firebase";
// require("firebase/firestore");

export function fetchUser(userId) {
  return (dispatch) => {
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
          console.log(snapshot.data());
        } else {
          console.log("does not exist");
        }
      });
  };
}

export function fetchUserPosts(userId) {
  return (dispatch) => {
    console.log("basic", userId);
    firestore
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}

export function fetchUsers(search) {
  console.log("search", search);
  return (dispatch) => {
    firestore
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let allUsers = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        console.log("allUsers", allUsers);
        dispatch({ type: USERS_STATE_CHANGE, allUsers });
      });
  };
}

export function onFollow(loggedInUserId, followUserId) {
  return (dispatch) => {
    firestore
      .collection("following")
      .doc(loggedInUserId)
      .collection("userFollowing")
      .doc(followUserId)
      .set({});
  };
}

export function onUnfollow(loggedInUserId, followUserId) {
  return (dispatch) => {
    firestore
      .collection("following")
      .doc(loggedInUserId)
      .collection("userFollowing")
      .doc(followUserId)
      .delete();
  };
}

export function fetchUserFollowingList(userId) {
  return (dispatch) => {
    firestore
      .collection("following")
      .doc(userId)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let userFollowingList = snapshot.docs.map((doc) => {
          return doc.id;
        });
        dispatch({ type: USER_FOLLOWING_LIST_CHANGE, userFollowingList });

        userFollowingList.forEach((id) =>
          dispatch(fetchUserFollowingPosts(id))
        );
      });
  };
}

export function fetchUserFollowingPosts(followUserId) {
  return (dispatch) => {
    firestore
      .collection("posts")
      .doc(followUserId)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });

        dispatch({ type: USER_FOLLOWING_POSTS_CHANGE, posts });
      });
  };
}

// export function fetchUserPosts(userId) {
//   return (dispatch) => {
//     console.log("basic", userId);
//     firestore
//       .collection("posts")
//       .doc(userId)
//       .collection("userPosts")
//       .orderBy("creation", "asc")
//       .get()
//       .then((snapshot) => {
//         console.log("simole");
//         let posts = snapshot.docs.map((doc) => {
//           const id = doc.id;
//           const data = doc.data();
//           return { id, ...data };
//         });
//         dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
//       });
//   };
// }
