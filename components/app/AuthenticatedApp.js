import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useAuthState } from "../../auth";
import { fetchUser } from "../../redux/actions/index";
import AddScreen from "../main/Add";
import MainScreen from "../main/Main";
import SaveScreen from "../main/Save";

const Stack = createStackNavigator();
export default function AuthenticatedApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Save" component={SaveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
