import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
  };

  function resetForm() {
    setLogin("");
    setEmail("");
    setPassword("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height" + 47}
      style={{ flex: 1, width: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View style={styles.wrapper}>
            <RegisterCont>
              <UserPhoto>
                <Svg
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  style={{ position: "absolute", right: -12, bottom: 14 }}
                >
                  <Circle
                    cx="12.5"
                    cy="12.5"
                    r="12"
                    fill="white"
                    stroke="#FF6C00"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
                    fill="#FF6C00"
                  />
                </Svg>
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
                    top: 148,
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
                  style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}
                >
                  Зареєстуватися
                </Text>
              </RegisterBtn>
              <Text
                style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}
              >
                Вже є акаунт? Увійти
              </Text>
            </RegisterCont>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const wrapperHeight = Dimensions.get("screen").height;
const paddingTop = Platform.OS === "ios" ? 347 : 294;

const styles = StyleSheet.create({
  wrapper: { paddingTop, minHeight: wrapperHeight },
});
