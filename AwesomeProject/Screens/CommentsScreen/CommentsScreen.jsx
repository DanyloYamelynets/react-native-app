import React from "react";
import { Text, View } from "react-native";

export const CommentsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 36 }}>Comments</Text>
    </View>
  );
};
