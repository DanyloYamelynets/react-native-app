import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  BtnText,
  ImgCont,
  LoadBtn,
  LoadText,
  LocationInput,
  LocationInputCont,
  PostBtn,
  PostImg,
  TitleInput,
  TrashBtn,
} from "./StyledCreatePostsScreen";
import { CameraSvg } from "../../assets/svg/CameraSvg";
import { LocationSvg } from "../../assets/svg/LocationSvg";
import { TrashSvg } from "../../assets/svg/TrashSvg";
import { useNavigation } from "@react-navigation/native";

export const CreatePostsScreen = () => {
  const [postImg, setPostImg] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postlocation, setPostLocation] = useState("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const navigation = useNavigation();

  const resetForm = () => {
    setPostImg("");
    setPostTitle("");
    setPostLocation("");
  };

  const onSubmitPost = () => {
    if (!postImg || !postName || !postlocation)
      return Alert.alert("Будь ласка, завантажте фото та заповніть поля");

    console.log({ postImg, postName, postlocation });

    navigation.navigate("Posts", {
      post: { postImg, postName, postlocation },
    });
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImgCont>
          <PostImg source={postImg}>
            <LoadBtn
              style={{
                backgroundColor: postImg
                  ? "rgba(255, 255, 255, 0.3)"
                  : "#ffffff",
              }}
            >
              <CameraSvg fillColor={postImg ? "#ffffff" : "#bdbdbd"} />
            </LoadBtn>
          </PostImg>
          <LoadText>{postImg ? "Редагувати фото" : "Завантажте фото"}</LoadText>
        </ImgCont>
        <View
          style={{
            width: "100%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <TitleInput
            style={{
              borderColor: "#e8e8e8",
            }}
            placeholderTextColor="#bdbdbd"
            placeholder="Назва..."
            isFocused={titleFocused}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
          />
          <LocationInputCont
            style={{
              borderColor: "#e8e8e8",
            }}
            isFocused={locationFocused}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
          >
            <LocationSvg style={styles.btnLocation} />
            <LocationInput
              placeholderTextColor="#bdbdbd"
              placeholder="Місцевість..."
            />
          </LocationInputCont>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <PostBtn
            style={{
              backgroundColor:
                !postImg || !postTitle || !postlocation ? "#f6f6f6" : "#ff6c00",
            }}
            onPress={onSubmitPost}
          >
            <BtnText
              style={{
                color:
                  !postImg || !postTitle || !postlocation
                    ? "#bdbdbd"
                    : "#ffffff",
              }}
            >
              Опублікувати
            </BtnText>
          </PostBtn>
        </View>
        <View
          style={{
            marginTop: "auto",
          }}
        >
          <TrashBtn onPress={resetForm}>
            <TrashSvg />
          </TrashBtn>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btnLocation: {
    position: "absolute",
    left: 0,
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
});
