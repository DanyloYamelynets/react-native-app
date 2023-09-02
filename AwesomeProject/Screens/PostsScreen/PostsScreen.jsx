import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Forest } from "../../Components/PostItems/Forest";
import { Sunset } from "../../Components/PostItems/Sunset";
import { Italy } from "../../Components/PostItems/Italy";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const newPost = route.params?.post || null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatarImg} />
          <View>
            <Text style={styles.avatarName}>Natali Romanova</Text>
            <Text style={styles.avatarEmail}>email@example.com</Text>
          </View>
        </View>
        {newPost && (
          <>
            <Image
              source={{ uri: newPost.postImg }}
              style={{
                width: "100%",
                height: 240,
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
            <Text style={styles.postTitle}>{newPost.postTitle}</Text>
            <View style={styles.postItemsCont}>
              <Pressable
                style={styles.actionBtn}
                onPress={() => navigation.navigate("Comments")}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#8b8b8b" />
                <Text style={styles.stats}>0</Text>
              </Pressable>
              <Pressable
                style={styles.actionBtn}
                onPress={() =>
                  navigation.navigate("Map", { coordinates: newPost.location })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text
                  style={{ ...styles.stats, textDecorationLine: "underline" }}
                >
                  {newPost.postLocation}
                </Text>
              </Pressable>
            </View>
          </>
        )}
        <View>
          <Forest showLikeButton={false} isPostsScreen={true} />
          <Sunset showLikeButton={false} isPostsScreen={true} />
          <Italy showLikeButton={false} isPostsScreen={true} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postItemsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 33,
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
  postTitle: {
    marginBottom: 8,
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
});
