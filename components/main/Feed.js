import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//todo - sort userFollowingPosts according to creation date

function Feed({ userFollowingPosts, navigation }) {
  if (userFollowingPosts.length < 1) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={1}
        horizontal={false}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        data={userFollowingPosts}
        renderItem={({ item }) => (
          <View>
            <Image
              style={{ flex: 1, aspectRatio: 1 / 1 }}
              source={{ uri: `${item?.downloadURL}` }}
            />
            <Text>{item.downloadURL}</Text>
            <Text
              onPress={() =>
                navigation.navigate("Comment", {
                  postId: item.id,
                })
              }
            >
              View comments...
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  userFollowingPosts: store.userState.userFollowingPosts,
});

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { fetchUser, fetchUserPosts, fetchUserFollowingList },
//     dispatch
//   );

export default connect(mapStateToProps, null)(Feed);
