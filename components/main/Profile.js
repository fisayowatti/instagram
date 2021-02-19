import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";

import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../../redux/actions";

function Profile(props) {
  const { posts, currentUser, route, fetchUser, fetchUserPosts } = props;

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
      };
    }, [route.params.uid])
  );
  console.log(posts);
  return (
    <View style={styles.container}>
      <View>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          numColumns={3}
          data={posts}
          horizontal={false}
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
