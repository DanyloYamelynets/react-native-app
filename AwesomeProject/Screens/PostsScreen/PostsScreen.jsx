import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          color: "#1B4371",
          fontFamily: "Roboto",
          fontSize: 36,
          position: "absolute",
          top: 82,
          right: 16,
        }}
      >
        PostsScreen
      </Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            color: "#1B4371",
            fontFamily: "Roboto",
            fontSize: 16,
            position: "absolute",
            top: 152,
            right: 16,
          }}
        >
          Вже є акаунт? Увійти
        </Text>
      </Pressable>
    </View>
  );
};
