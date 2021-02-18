import React from "react";

import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";

function Profile(props) {
  const { posts, currentUser } = props;
  console.log(posts);
  return (
    <View style={styles.container}>
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

export default connect(mapStateToProps, null)(Profile);
