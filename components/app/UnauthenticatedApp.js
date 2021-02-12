import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Landing from "../auth/Landing";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Stack = createStackNavigator();
export default function UnauthenticatedApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
