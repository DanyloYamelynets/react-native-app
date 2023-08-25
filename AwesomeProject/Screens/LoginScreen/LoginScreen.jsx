import React from "react";
import { Text } from "react-native";
import { LoginBtn, LoginCont, LoginForm, StyledInput } from "./StyledLogin";

export const LoginScreen = () => {
  return (
    <LoginCont>
      <Text style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>Увійти</Text>
      <LoginForm>
        <StyledInput placeholder="Адреса електронної пошти" />
        <StyledInput placeholder="Пароль" />
        <Text
          style={{
            position: "absolute",
            color: "#1B4371",
            top: 82,
            right: 16,
            fontFamily: "Roboto",
            fontSize: 16,
          }}
        >
          Показати
        </Text>
      </LoginForm>
      <LoginBtn>
        <Text style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}>
          Увійти
        </Text>
      </LoginBtn>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Немає акаунту? Зареєструватися
      </Text>
    </LoginCont>
  );
};
