import React from "react";
import { Text } from "react-native";
import {
  RegisterBtn,
  RegisterCont,
  RegisterForm,
  StyledInput,
  UserPhoto,
} from "./StyledRegistration";
import { Circle, Path, Svg } from "react-native-svg";

export const RegistrationScreen = () => {
  return (
    <RegisterCont>
      <UserPhoto>
        <Svg
          width={25}
          height={25}
          viewBox="0 0 25 25"
          style={{ position: "absolute", right: -12, bottom: 14 }}
        >
          <Circle cx="12.5" cy="12.5" r="12" fill="white" stroke="#FF6C00" />
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
        <StyledInput placeholder="Логін" />
        <StyledInput placeholder="Адреса електронної пошти" />
        <StyledInput placeholder="Пароль" />
        <Text
          style={{
            position: "absolute",
            color: "#1B4371",
            top: 148,
            right: 16,
            fontFamily: "Roboto",
            fontSize: 16,
          }}
        >
          Показати
        </Text>
      </RegisterForm>
      <RegisterBtn>
        <Text style={{ color: "#fff", fontFamily: "Roboto", fontSize: 16 }}>
          Зареєстуватися
        </Text>
      </RegisterBtn>
      <Text style={{ color: "#1B4371", fontFamily: "Roboto", fontSize: 16 }}>
        Вже є акаунт? Увійти
      </Text>
    </RegisterCont>
  );
};
