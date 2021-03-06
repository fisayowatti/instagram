import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { useAuth } from "../../auth";
import { firestore } from "../../firebase-setup";

//something weird is happening where trying to update a value in a post is resulting in duplicate posts

function Feed({ userFollowingPosts, navigation, likedPosts }) {
  const { userId } = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const sortedPosts = userFollowingPosts.sort(
      (a, b) => a.creation - b.creation
    );
    setPosts(sortedPosts);
  }, [userFollowingPosts]);

  if (userFollowingPosts.length < 1) {
    return (
      <View style={styles.emptyContainer}>
        <Text>There's no post on your feed yet</Text>
      </View>
    );
  }

  const increaseLikesCount = (postId, creatorId) => {
    return firestore
      .collection("posts")
      .doc(creatorId)
      .collection("userPosts")
      .doc(postId)
      .update({
        likesCount: posts.find((post) => post.id === postId)["likesCount"] + 1,
      });
  };
  const decreaseLikesCount = (postId, creatorId) => {
    return firestore
      .collection("posts")
      .doc(creatorId)
      .collection("userPosts")
      .doc(postId)
      .update({
        likesCount: posts.find((post) => post.id === postId)["likesCount"] - 1,
      });
  };

  const onLikePress = (postId, creatorId) => {
    firestore
      .collection("likes")
      .doc(userId)
      .collection("userLikes")
      .doc(postId)
      .set({});
    // .then(() => increaseLikesCount(postId, creatorId));
  };

  const onDislikePress = (postId, creatorId) => {
    firestore
      .collection("likes")
      .doc(userId)
      .collection("userLikes")
      .doc(postId)
      .delete();
    // .then(() => decreaseLikesCount(postId, creatorId));
  };

  console.log("likee", likedPosts, posts);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={1}
        horizontal={false}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Image
              style={{ flex: 1, aspectRatio: 1 / 1 }}
              source={{ uri: `${item?.downloadURL}` }}
            />
            <Text>{item.downloadURL}</Text>
            <View>
              <Text
                onPress={() =>
                  navigation.navigate("Comment", {
                    postId: item.id,
                    userId,
                  })
                }
              >
                View comments...
              </Text>
              <Text
                onPress={() =>
                  likedPosts.find((likedPostId) => likedPostId === item.id)
                    ? onDislikePress(item.id, item.creatorId)
                    : onLikePress(item.id, item.creatorId)
                }
              >
                {likedPosts.find((likedPostId) => likedPostId === item.id)
                  ? "Dislike"
                  : "Like"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  userFollowingPosts: store.userState.userFollowingPosts,
  likedPosts: store.userState.likedPosts,
});

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { fetchUser, fetchUserPosts, fetchUserFollowingList },
//     dispatch
//   );

export default connect(mapStateToProps, null)(Feed);
