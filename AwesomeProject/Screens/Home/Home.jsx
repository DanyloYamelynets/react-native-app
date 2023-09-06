import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { Ionicons } from "@expo/vector-icons";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { LogOutSvg } from "../../assets/svg/LogOutSvg";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/authSlice";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const LogOut = () => {
    const handleLogOut = () => {
      dispatch(signOut());
      navigation.navigate("Login");
    };

    return (
      <LogOutSvg
        onPress={handleLogOut}
        title="Log Out"
        color="#fff"
        style={{
          width: 24,
          height: 24,
          marginRight: 60,
          marginRight: 16,
          paddingVertical: 10,
        }}
      />
    );
  };

  const goBack = () => {
    return (
      <View style={{ marginLeft: 16 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Posts")}
        >
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            color="rgba(33, 33, 33, 0.80)"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabIcon = (routeName, iconName, color, additionalStyles) => {
    return (
      <Pressable
        onPress={() => {
          navigation.dispatch(TabActions.jumpTo(routeName));
        }}
        style={{
          alignItems: "center",
          marginBottom: Platform.OS === "android" ? 30 : 0,
          ...additionalStyles,
        }}
      >
        <Ionicons name={iconName} size={24} color={color} />
      </Pressable>
    );
  };

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarStyle: {
          height: 83,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 81,
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.2)",
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: LogOut,
          tabBarShowLabel: false,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
          },
          tabBarIcon: () =>
            renderTabIcon("Posts", "grid-outline", "rgba(33, 33, 33, 0.80)"),
        }}
      />
      <Tabs.Screen
        name="Create Posts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: goBack,
          tabBarStyle: { display: "none" },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
          },
          tabBarIcon: () =>
            renderTabIcon("Create Posts", "add", "#FFFFFF", {
              width: 70,
              height: 40,
              paddingVertical: 8,
              paddingHorizontal: 8,
              backgroundColor: "#FF6C00",
              borderRadius: 20,
            }),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () =>
            renderTabIcon(
              "Profile",
              "person-outline",
              "rgba(33, 33, 33, 0.80)"
            ),
        }}
      />
    </Tabs.Navigator>
  );
};
