import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, FlatList } from "react-native";
import { connect } from "react-redux";
import { firestore } from "../../firebase";
import { useAuth, useAuthState } from "../../auth";
import { auth as firebaseAuth } from "../../firebase";

function Comment({ route, allUsers }) {
  const {
    params: { userId },
  } = route;
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  console.log("ichbe", allUsers);

  useEffect(() => {
    fetchComments();
  }, [route.params.postId, userId]);

  const saveComment = () => {
    firestore
      .collection("comments")
      .doc(userId)
      .collection("userComments")
      .add({
        post: route.params.postId,
        creator: userId,
        text,
      });
  };

  const fetchComments = () => {
    console.log("fetching again", comments);
    firestore
      .collection("comments")
      .doc(userId)
      .collection("userComments")
      .where("post", "==", route.params.postId)
      .get()
      .then((snapshot) => {
        let postComments = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();

          const user = allUsers.find((user) => user.id == data.creator);

          return { id, ...data, user };
        });
        setComments(postComments);
      });
  };

  return (
    <View>
      <FlatList
        data={comments}
        // extraData={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.user.name}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <Text>Enter anew comment below</Text>
      <TextInput
        placeholder="Please drop a comment"
        onChangeText={(text) => setText(text)}
      />
      <Button title="Save" onPress={() => saveComment()} />
    </View>
  );
}

const mapStateToProps = (store) => ({
  allUsers: store.userState.allUsers,
});

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       fetchUser,
//       fetchUserPosts,
//       fetchUserFollowingList,
//       clearData,
//       fetchUsers,
//     },
//     dispatch
//   );

export default connect(mapStateToProps, null)(Comment);
