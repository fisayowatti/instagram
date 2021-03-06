import { useFocusEffect } from "@react-navigation/native";
import React from "react";

import { View, Text, StyleSheet, Image, FlatList, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth } from "../../firebase";
import {
  fetchUser,
  fetchUserFollowingList,
  fetchUserPosts,
  onFollow,
  onUnfollow,
} from "../../redux/actions";

function Profile(props) {
  const {
    posts,
    currentUser,
    route,
    fetchUser,
    fetchUserPosts,
    userFollowingList,
    onUnfollow,
    onFollow,
  } = props;

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      console.log("profile uid", route.params.uid);
      fetchUser(route.params.uid);
      fetchUserPosts(route.params.uid);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        route.params.uid = props.userId;
        console.log("new uid", route.params.uid);
      };
    }, [route.params.uid])
  );

  // if (!currentUser) {
  //   return <View />;
  // }

  const onLogout = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>
        {route.params.uid && route.params.uid !== props.userId ? (
          <Button
            title={
              userFollowingList.indexOf(route.params.uid) > -1
                ? "Following"
                : "Follow"
            }
            onPress={() =>
              userFollowingList.indexOf(route.params.uid) > -1
                ? onUnfollow(props.userId, route.params.uid)
                : onFollow(props.userId, route.params.uid)
            }
          />
        ) : (
          <Button title="Logout" onPress={onLogout} />
        )}
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.imgContainer}>
              <Image source={{ uri: item.downloadURL }} style={styles.img} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  galleryContainer: {
    flex: 1,
  },
  imgContainer: {
    flex: 1 / 3,
  },
  img: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  userFollowingList: store.userState.userFollowingList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, onFollow, onUnfollow, fetchUserFollowingList },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
