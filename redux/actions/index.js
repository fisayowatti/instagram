import { firestore } from "../../firebase";
import { USER_STATE_CHANGE } from "../constants/index";
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
        } else {
          console.log("does not exist");
        }
      });
  };
}
