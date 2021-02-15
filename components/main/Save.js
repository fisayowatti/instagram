import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Image, TextInput, View } from "react-native";
import { useAuthState } from "../../auth";
import { firestore, storage } from "../../firebase";

export default function Save(props) {
  const [caption, setCaption] = useState("");
  const [taskToUnsubscribe, setTaskToUnsubscribe] = useState(null);

  const { auth } = useAuthState();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        if (taskToUnsubscribe) {
          console.log("unsubscribed");
          taskToUnsubscribe();
        }
      };
    }, [taskToUnsubscribe])
  );

  //   useEffect(() => {
  //     return () => {
  //       if (taskToUnsubscribe) {
  //         console.log("unsubscribed");
  //         taskToUnsubscribe();
  //       }
  //     };
  //   }, [taskToUnsubscribe]);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `posts/${auth.userId}/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadTask = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(
        `Progress: ${Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )}%`
      );
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    const taskCompleted = async () => {
      //prepare the uploadTask to be unsubscribed in a lifecycle hook
      setTaskToUnsubscribe(activeUploadTask);

      //get metadata
      let uploadTaskRef = uploadTask.snapshot.ref;
      let metadata = await uploadTaskRef.getMetadata();

      //get download url and call savePostData()
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => savePostData(downloadURL, metadata.timeCreated));
    };

    const activeUploadTask = uploadTask.on(
      "state_changed",
      taskProgress,
      taskError,
      taskCompleted
    );
  };

  const savePostData = (downloadURL, timeCreated) => {
    firestore
      .collection("posts")
      .doc(auth.userId)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        likesCount: 0,
        creation: timeCreated,
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Caption the image"
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
