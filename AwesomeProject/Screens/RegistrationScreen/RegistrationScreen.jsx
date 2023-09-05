import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  RegisterBtn,
  RegisterCont,
  RegisterForm,
  StyledInput,
  UserPhoto,
} from "./StyledRegistration";
import backgroundImg from "../../assets/images/background.png";
import { AddRegisterImg } from "../../assets/svg/AddRegisterImg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authStateChange } from "../../redux/auth/authSlice";
import { authSignUpUser } from "../../redux/auth/authOperations";
import * as ImagePicker from "expo-image-picker";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "firebase/storage";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressIn = () => {
    setPasswordVisibility(false);
  };
  const onPressOut = () => {
    setPasswordVisibility(true);
  };

  const onRegister = async () => {
    if (!login || !email || !password || !avatar) {
      return Alert.alert("Заповніть всі поля");
    }

    const photo = avatar
      ? await uploadImageToServer(avatar, "avatars")
      : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57";

    dispatch(authSignUpUser({ photo, login, email, password })).then((data) => {
      if (data === undefined || !data.uid) {
        console.log(
          `login: ${login}, email: ${email}, password: ${password}, photO: ${avatar}`
        );
        Alert.alert(`Реєстрацію не виконано!`);
        return;
      }
      dispatch(authStateChange({ stateChange: true }));
      console.log(data);
    });

    // resetForm();
    // console.log(
    //   `login: ${login}, email: ${email}, password: ${password}, photO: ${avatar}`
    // );
    navigation.navigate("Home");
  };

  const onLoadAvatar = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadImageToServer = async (imageUri, prefixFolder) => {
    const uniquePostId = Date.now().toString();

    if (imageUri) {
      try {
        const response = await fetch(imageUri);

        const file = await response.blob();

        const storageRef = ref(storage, `${prefixFolder}/${uniquePostId}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
      } catch (error) {
        console.warn("uploadImageToServer: ", error);
      }
    }
  };

  const resetForm = () => {
    setLogin(null);
    setEmail(null);
    setPassword(null);
    setAvatar(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImg}
          resizeMode="cover"
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height" + 47}
            style={{ flex: 1, width: "100%" }}
          >
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <View style={styles.wrapper}>
                <RegisterCont>
                  <UserPhoto>
                    <Image style={styles.avatar} source={{ uri: avatar }} />
                    <Pressable
                      style={
                        avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar
                      }
                      onPress={onLoadAvatar}
                    >
                      <AddRegisterImg
                        style={
                          avatar
                            ? styles.btnAddAvatarSvgLoad
                            : styles.btnAddAvatarSvg
                        }
                      />
                    </Pressable>
                  </UserPhoto>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
                    Реєстрація
                  </Text>
                  <RegisterForm>
                    <StyledInput
                      value={login}
                      onChangeText={setLogin}
                      isFocused={loginFocused}
                      onFocus={() => setLoginFocused(true)}
                      onBlur={() => setLoginFocused(false)}
                      placeholder="Логін"
                    />
                    <StyledInput
                      value={email}
                      onChangeText={setEmail}
                      isFocused={emailFocused}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="Адреса електронної пошти"
                    />
                    <StyledInput
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={passwordVisibility}
                      isFocused={passwordFocused}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="Пароль"
                    />
                    <Pressable
                      onPressOut={onPressOut}
                      onPressIn={onPressIn}
                      style={{
                        position: "absolute",
                        top: Platform.OS === "ios" ? 148 : 146,
                        right: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1B4371",
                          fontFamily: "Roboto",
                          fontSize: 16,
                        }}
                      >
                        Показати
                      </Text>
                    </Pressable>
                  </RegisterForm>
                  <RegisterBtn onPress={onRegister}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Зареєстуватися
                    </Text>
                  </RegisterBtn>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1B4371",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Вже є акаунт?{" "}
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          color: "#1B4371",
                          fontFamily: "Roboto",
                          fontSize: 16,
                        }}
                      >
                        Увійти
                      </Text>
                    </Pressable>
                  </View>
                </RegisterCont>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const wrapperHeight = Dimensions.get("screen").height;
const paddingTop = Platform.OS === "ios" ? 347 : 294;

const styles = StyleSheet.create({
  wrapper: { paddingTop, minHeight: wrapperHeight },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImg: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
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
