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
import { LoginBtn, LoginCont, LoginForm, StyledInput } from "./StyledLogin";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const onPressIn = () => {
    setPasswordVisibility(false);
  };
  const onPressOut = () => {
    setPasswordVisibility(true);
  };

  const onLogin = () => {
    if (!email || !password) {
      return Alert.alert("Fill in all fields");
    }
    resetForm();
    console.log(`email: ${email}, password: ${password}`);
  };

  function resetForm() {
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
            <LoginCont>
              <Text style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
                Увійти
              </Text>
              <LoginForm>
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
                    top: 82,
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
              </LoginForm>
              <LoginBtn onPress={onLogin}>
                <Text
                  style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}
                >
                  Увійти
                </Text>
              </LoginBtn>
              <Text
                style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}
              >
                Немає акаунту? Зареєструватися
              </Text>
            </LoginCont>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const wrapperHeight = Dimensions.get("screen").height;
const paddingTop = Platform.OS === "ios" ? 407 : 292;

const styles = StyleSheet.create({
  wrapper: { paddingTop, minHeight: wrapperHeight },
});
