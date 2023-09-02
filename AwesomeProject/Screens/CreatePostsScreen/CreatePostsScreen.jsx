import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const CreatePostsScreen = () => {
  const [postImg, setPostImg] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(true);

  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  const resetForm = () => {
    setPostImg(null);
    setPostTitle("");
    setPostLocation("");
    setShowCamera(true);
  };

  const onSubmitPost = () => {
    if (!postImg || !postTitle || !postLocation)
      return Alert.alert("Будь ласка, завантажте фото та заповніть поля");

    console.log({ postImg, postTitle, postLocation, location });

    navigation.navigate("Profile", {
      post: { postImg, postTitle, postLocation, location },
    });

    navigation.navigate("Posts", {
      post: { postImg, postTitle, postLocation, location },
    });

    resetForm();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const addImageLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPostImg(uri);
      setShowCamera(false);
    }
    addImageLocation();
  };

  const openCamera = () => {
    setPostImg("");
    setShowCamera(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImgCont>
          <ImageBackground
            style={{
              width: "100%",
              height: 240,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <PostImg source={postImg ? { uri: postImg } : null}>
              <Camera
                style={{
                  width: "100%",
                  height: 242,
                  borderRadius: 8,
                  display: postImg ? "none" : "flex",
                }}
                type={cameraType}
                ref={cameraRef}
              >
                <View style={styles.cameraButtonsContainer}>
                  <LoadBtn
                    style={{
                      backgroundColor: postImg
                        ? "rgba(255, 255, 255, 0.3)"
                        : "#ffffff",
                    }}
                    onPress={takePicture}
                  >
                    <CameraSvg fillColor={postImg ? "#ffffff" : "#bdbdbd"} />
                  </LoadBtn>
                  <TouchableOpacity
                    style={styles.flipCameraButton}
                    onPress={() => {
                      setCameraType(
                        cameraType === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Ionicons name="sync" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </Camera>
              <LoadBtn
                style={{
                  backgroundColor: postImg
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#ffffff",
                  display: postImg ? "flex" : "none",
                  marginTop: 0,
                }}
                onPress={openCamera}
              >
                <CameraSvg fillColor={postImg ? "#ffffff" : "#bdbdbd"} />
              </LoadBtn>
            </PostImg>
          </ImageBackground>
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
            value={postTitle}
            onChangeText={setPostTitle}
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
              value={postLocation}
              onChangeText={setPostLocation}
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
                !postImg || !postTitle || !postLocation ? "#f6f6f6" : "#ff6c00",
            }}
            onPress={onSubmitPost}
          >
            <BtnText
              style={{
                color:
                  !postImg || !postTitle || !postLocation
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
  cameraButtonsContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 24,
  },
  flipCameraButton: {
    backgroundColor: "#bdbdbd7c",
    padding: 10,
    borderRadius: 50,
    margin: 16,
    position: "relative",
    top: 25,
    left: 165,
  },
});
