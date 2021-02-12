import React, { useContext, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useAuth, useAuthState } from "../../auth";
import { auth, firestore } from "../../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { userId } = useAuth();

  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password) // email: test1@mail.com , password: 123456
      .then((result) => {
        firestore.collection("users").doc(auth.currentUser.uid).set({
          name,
          email,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} />
      <Button title="sign up" onPress={() => onSignUp()} />
    </View>
  );
}
