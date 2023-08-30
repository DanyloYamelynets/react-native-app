import React, { useState } from "react";
import {
  Alert,
  Dimensions,
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
import { Circle, Path, Svg } from "react-native-svg";
import backgroundImg from "../../assets/images/background.png";
import { useNavigation } from "@react-navigation/native";
import { AddRegisterImg } from "../../assets/svg/AddRegisterImg";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation();

  const onPressIn = () => {
    setPasswordVisibility(false);
  };
  const onPressOut = () => {
    setPasswordVisibility(true);
  };

  const onRegister = () => {
    if (!login || !email || !password) {
      return Alert.alert("Fill in all fields");
    }
    resetForm();
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    navigation.navigate("Home");
  };

  function resetForm() {
    setLogin("");
    setEmail("");
    setPassword("");
  }

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
                    <AddRegisterImg style={{}} />
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
});
