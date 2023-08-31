import React from "react";
import {
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

export const CreatePostsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImgCont>
          <PostImg>
            <LoadBtn>
              <CameraSvg fillColor={"#bdbdbd"} />
            </LoadBtn>
          </PostImg>
          <LoadText>Завантажте фото</LoadText>
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
          />
          <LocationInputCont
            style={{
              borderColor: "#e8e8e8",
            }}
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
          <PostBtn>
            <BtnText>Опублікувати</BtnText>
          </PostBtn>
        </View>
        <View
          style={{
            marginTop: "auto",
          }}
        >
          <TrashBtn>
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
