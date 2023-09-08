import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/auth/authSelectors";
import { auth, db } from "../../redux/firebase/config";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const newPost = route.params?.post || null;
  const isFocused = useIsFocused();
  const [userPosts, setPosts] = useState([]);

  const email = useSelector(selectEmail);
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

  const updateCommentCount = (index, newCommentCount) => {
    const updatedPosts = [...userPosts];
    updatedPosts[index].commentCount = newCommentCount;
    setPosts(updatedPosts);
  };

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatarImg} source={{ uri: userAvatar }} />
          <View>
            <Text style={styles.avatarName}>{userName}</Text>
            <Text style={styles.avatarEmail}>{email}</Text>
          </View>
        </View>
        {userPosts.length === 0 ? (
          <Text style={styles.noPostsText}>Створіть свою першу публікацію</Text>
        ) : (
          userPosts.map((post, index) => (
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
                      postId: post.postId,
                      postImg: post.postImg,
                      updateCommentCount: (newCommentCount) => {
                        updateCommentCount(index, newCommentCount);
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
                    navigation.navigate("Map", { coordinates: post.location })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text
                    style={{ ...styles.stats, textDecorationLine: "underline" }}
                  >
                    {post.postLocation}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
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
  noPostsText: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#8b8b8b",
    textAlign: "center",
    marginTop: "50%",
    paddingBottom: "100%",
  },
});
