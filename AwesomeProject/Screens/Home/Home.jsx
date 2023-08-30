import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { Ionicons } from "@expo/vector-icons";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { LogOutSvg } from "../../assets/svg/LogOutSvg";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  const LogOut = () => {
    return (
      <LogOutSvg
        onPress={() => navigation.navigate("Login")}
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

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      tabBar={(props) => (
        <View
          style={{
            flexDirection: "row",
            height: 83,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 101,
            paddingBottom: 30,
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.2)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Pressable
            onPress={() => props.navigation.navigate("Posts")}
            style={{ alignItems: "center" }}
          >
            <Ionicons
              name={"grid-outline"}
              size={24}
              color={"rgba(33, 33, 33, 0.80)"}
            />
          </Pressable>
          <Pressable
            onPress={() => props.navigation.navigate("Create Posts")}
            style={{
              alignItems: "center",
              width: 70,
              height: 40,

              paddingVertical: 8,
              paddingHorizontal: 8,

              backgroundColor: "#FF6C00",
              borderRadius: 20,
            }}
          >
            <Ionicons name={"add"} size={24} color={"#FFFFFF"} />
          </Pressable>
          <Pressable
            onPress={() => props.navigation.navigate("Profile")}
            style={{ alignItems: "center" }}
          >
            <Ionicons
              name={"person-outline"}
              size={24}
              color={"rgba(33, 33, 33, 0.80)"}
            />
          </Pressable>
        </View>
      )}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerLeft: null,
          headerRight: LogOut,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
          },
        }}
      />
      <Tabs.Screen
        name="Create Posts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: goBack,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};
