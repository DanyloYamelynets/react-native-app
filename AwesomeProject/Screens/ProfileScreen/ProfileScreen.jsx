import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AddRegisterImg } from "../../assets/svg/AddRegisterImg";
import { LogOutSvg } from "../../assets/svg/LogOutSvg";
import { useNavigation, useRoute } from "@react-navigation/native";
import backgroundImg from "../../assets/images/background.png";
import {
  LogOutBtn,
  ProfileCont,
  UserAvatar,
  UserName,
} from "./StyledProfileScreen";
import { Forest } from "../../Components/PostItems/Forest";
import { Sunset } from "../../Components/PostItems/Sunset";
import { Italy } from "../../Components/PostItems/Italy";
import { Feather, Ionicons } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const newPost = route.params?.post || null;
  const [posts, setPosts] = useState([]);
  //  const [commentCount, setCommentCount] = useState(0);

  const addNewPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  useEffect(() => {
    if (newPost) {
      addNewPost(newPost);
    }
  }, [newPost]);

  return (
    <ImageBackground
      source={backgroundImg}
      style={{
        resizeMode: "cover",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <ProfileCont>
        <UserAvatar>
          <AddRegisterImg
            style={{ position: "absolute", bottom: 8, right: -18 }}
          />
        </UserAvatar>
        <LogOutBtn>
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
        </LogOutBtn>
        <UserName>Natali Romanova</UserName>
        <ScrollView>
          <View
            style={{
              width: 414,
              paddingHorizontal: 16,
            }}
          >
            {posts.map((post, index) => (
              <View key={index}>
                <Image
                  source={{ uri: post.postImg }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                />
                <Text style={styles.postTitle}>{post.postTitle}</Text>
                <View style={styles.postItemsCont}>
                  <Pressable
                    style={styles.actionBtn}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postImg: post.postImg,
                        updateCommentCount: (newCommentCount) => {
                          const updatedPosts = [...posts];
                          updatedPosts[index].commentCount = newCommentCount;
                          setPosts(updatedPosts);
                        },
                      })
                    }
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={24}
                      color="#8b8b8b"
                    />
                    <Text style={styles.stats}>{post.commentCount || 0}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.actionBtn}
                    onPress={() =>
                      navigation.navigate("Map", { coordinates: post.location })
                    }
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text
                      style={{
                        ...styles.stats,
                        textDecorationLine: "underline",
                      }}
                    >
                      {post.postLocation}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
            <Forest isPostsScreen={false} />
            <Sunset isPostsScreen={false} />
            <Italy isPostsScreen={false} />
          </View>
        </ScrollView>
      </ProfileCont>
    </ImageBackground>
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
