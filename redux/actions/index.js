import { firestore } from "../../firebase";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index";
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
      // .get()
      .onSnapshot((snapshot) => {
        console.log("simole");
        let posts = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
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
