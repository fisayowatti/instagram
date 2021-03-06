import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Instagram</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
