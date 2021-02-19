import React, { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import FeedScreen from "./Feed";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import { fetchUser, fetchUserPosts } from "../../redux/actions/index";
import { bindActionCreators } from "redux";
import { useAuthState } from "../../auth";
import { connect } from "react-redux";

const Main = ({ fetchUser, fetchUserPosts, currentUser }) => {
  const Tab = createBottomTabNavigator();

  const { auth } = useAuthState();
  useEffect(() => {
    fetchUser(auth.userId);
    fetchUserPosts(auth.userId);
  }, [auth.userId]);

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        // component={() => <View></View>}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      >
        {() => <View />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        // component={ProfileScreen}
        children={(props) => <ProfileScreen userId={auth.userId} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
        initialParams={{ uid: auth.userId }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
