import React, { useEffect, useState } from "react";

import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Feed({ userFollowingPosts }) {
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
          <View style={{ flex: 1 / 3 }}>
            <Image
              style={{ flex: 1, aspectRatio: 1 / 1 }}
              source={{ uri: `${item?.downloadURL}` }}
            />
            <Text>{item.downloadURL}</Text>
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
