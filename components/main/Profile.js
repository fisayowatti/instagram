import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";

function Profile(props) {
  const { posts, currentUser } = props;
  console.log(posts);
  return (
    <View style={styles.container}>
      {/* <Image
        source={{uri: }}
      /> */}
      <Text>Policeeee</Text>
      <Text>Policeeee</Text>
      <Text>{posts[0]?.id}</Text>
      <Text>{currentUser.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
