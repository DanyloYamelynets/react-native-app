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
import { useDispatch, useSelector } from "react-redux";
import { selectAvatar, selectLogin } from "../../redux/auth/authSelectors";
import { signOut } from "../../redux/auth/authSlice";
import { auth, db } from "../../redux/firebase/config";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const newPost = route.params?.post || null;
  const [userPosts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const userName = auth.currentUser?.displayName;
  const userAvatar = auth.currentUser?.photoURL;

  const addNewPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  useEffect(() => {
    if (newPost) {
      addNewPost(newPost);
    }
  }, [newPost]);

  const fetchUserPosts = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "posts"), where("userId", "==", user.uid))
        );
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserPosts();
    }
  }, [isFocused]);

  const handleLogOut = () => {
    dispatch(signOut());
    navigation.navigate("Login");
  };

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
          <Image style={styles.avatar} source={{ uri: userAvatar }} />
          <Pressable
            style={userAvatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
            // onPress={onLoadAvatar}
          >
            <AddRegisterImg
              style={
                userAvatar ? styles.btnAddAvatarSvgLoad : styles.btnAddAvatarSvg
              }
            />
          </Pressable>
        </UserAvatar>
        <LogOutBtn>
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
        </LogOutBtn>
        <UserName>{userName}</UserName>
        <ScrollView>
          <View
            style={{
              width: 414,
              paddingHorizontal: 16,
            }}
          >
            {userPosts.map((post, index) => (
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
                          const updatedPosts = [...userPosts];
                          updatedPosts[index].commentCount = newCommentCount;
                          setPosts(updatedPosts);
                        },
                      })
                    }
                  >
                    <Ionicons
                      name={
                        post.commentCount
                          ? "chatbubble-sharp"
                          : "chatbubble-outline"
                      }
                      size={24}
                      color={post.commentCount ? "#FF6C00" : "#8b8b8b"}
                    />
                    <Text style={styles.stats}>{post.commentCount || 0}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.actionBtn}
                    onPress={() =>
                      navigation.navigate("Map", {
                        coordinates: post.location,
                      })
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: "absolute",
    bottom: 8,
    right: 19,
    alignItems: "center",
    alignContent: "center",
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    transform: [{ rotate: "45deg" }],
  },
  btnAddAvatarSvg: {
    fill: "#ff6c00",
    stroke: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  btnAddAvatarSvgLoad: {
    fill: "#bdbdbd",
    stroke: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
});
