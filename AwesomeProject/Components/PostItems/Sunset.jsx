import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const Sunset = () => {
  const navigation = useNavigation();

  const sunsetCoords = {
    latitude: 46.611487,
    longitude: 31.080446,
  };

  return (
    <View style={styles.postCont}>
      <Image
        source={require("../../assets/images/Sunset.jpg")}
        style={styles.postImage}
      />
      <Text style={styles.postTitle}>Захід на Чорному морі</Text>
      <View style={styles.postItemsCont}>
        <View style={styles.postDesc}>
          <Pressable
            style={styles.actionBtn}
            onPress={() => navigation.navigate("Comments")}
          >
            <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
            <Text style={styles.stats}>3</Text>
          </Pressable>

          <Pressable style={{ ...styles.actionBtn, marginLeft: 24 }}>
            <Feather name="thumbs-up" size={24} color="#FF6C00" />
            <Text style={styles.stats}>200</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("Map", { coordinates: sunsetCoords })
          }
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.stats, textDecorationLine: "underline" }}>
            Ukraine
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postCont: {
    marginBottom: 32,
  },
  postImage: {
    width: 373,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  postItemsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stats: {
    fontFamily: "Roboto",
    marginLeft: 6,
    fontSize: 16,
    color: "#212121",
  },
});
