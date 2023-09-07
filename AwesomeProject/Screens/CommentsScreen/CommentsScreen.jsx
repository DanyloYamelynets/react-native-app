import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CommentItem from "../../Components/CommentItem/CommentItem";
import {
  addCommentToFirebase,
  getAllCommentsFromFirebase,
} from "../../Components/AddCommentsFunc";
import { useEffect } from "react";

export const CommentsScreen = ({ route }) => {
  const { postImg, updateCommentCount } = route.params;
  const [commentText, setCommentText] = useState("");
  const [comments, setComment] = useState([]);

  const handleAddComment = async () => {
    if (!commentText.trim())
      return Alert.alert("Будь ласка, напишіть коментар");

    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const hours = currentDate.getHours();
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    const formattedDate = `${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }, ${currentDate.getFullYear()} | ${formattedHours}:${formattedMinutes}`;

    const newComment = {
      autorAvatar: "",
      comment: commentText,
      date: formattedDate,
    };

    await addCommentToFirebase(newComment);

    const commentsFromFirebase = await getAllCommentsFromFirebase();

    setComment(commentsFromFirebase);
    setCommentText("");

    updateCommentCount(commentsFromFirebase.length + 1);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsFromFirebase = await getAllCommentsFromFirebase();
      setComment(commentsFromFirebase);
    };

    fetchComments();
  }, []);

  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={{ uri: postImg }}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 8,
            overflow: "hidden",
          }}
        />
        <FlatList
          style={styles.commentList}
          data={comments}
          renderItem={({ item }) => (
            <CommentItem
              comment={item.comment}
              date={item.date}
              autorAvatar={item.autorAvatar}
            />
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <View>
          <TextInput
            style={styles.commentInput}
            placeholder="Коментувати..."
            placeholderTextColor="#bdbdbd"
            autoComplete="off"
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity
            style={styles.commentBtn}
            onPress={handleAddComment}
          >
            <Ionicons name="arrow-up-sharp" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  commentList: {
    marginTop: 32,
    marginBottom: 32,
  },
  commentInput: {
    position: "relative",
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 100,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  commentBtn: {
    position: "absolute",
    right: 8,
    top: 6,
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});
