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
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LoginBtn, LoginCont, LoginForm, StyledInput } from "./StyledLogin";
import backgroundImg from "../../assets/images/background.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/authSlice";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../redux/firebase/config";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onChangeEmail = (text) => {
    setState((prevState) => ({ ...prevState, email: text.trim() }));
  };
  const onChangePassword = (text) => {
    setState((prevState) => ({ ...prevState, password: text.trim() }));
  };

  const onPressIn = () => {
    setPasswordVisibility(false);
  };
  const onPressOut = () => {
    setPasswordVisibility(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn, navigation]);

  const onLogin = async () => {
    if (!state.email || !state.password) {
      return Alert.alert("Заповніть всі поля");
    }

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      dispatch(
        logIn({
          email: state.email,
          password: state.password,
        })
      );
      navigation.navigate("Home");
      setState(initialState);
      return credentials.user;
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
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
                <LoginCont>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>
                    Увійти
                  </Text>
                  <LoginForm>
                    <StyledInput
                      value={state.email}
                      onChangeText={onChangeEmail}
                      isFocused={emailFocused}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="Адреса електронної пошти"
                    />
                    <StyledInput
                      value={state.password}
                      onChangeText={onChangePassword}
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
                        top: Platform.OS === "ios" ? 82 : 80,
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
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Увійти
                    </Text>
                  </LoginBtn>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1B4371",
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Немає акаунту?{" "}
                    </Text>
                    <Pressable
                      onPress={() => navigation.navigate("Registration")}
                    >
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          color: "#1B4371",
                          fontFamily: "Roboto",
                          fontSize: 16,
                        }}
                      >
                        Зареєструватися
                      </Text>
                    </Pressable>
                  </View>
                </LoginCont>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const wrapperHeight = Dimensions.get("screen").height;
const paddingTop = Platform.OS === "ios" ? 407 : 354;

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
