import React from "react";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";
import { AddRegisterImg } from "../../assets/svg/AddRegisterImg";
import { LogOutSvg } from "../../assets/svg/LogOutSvg";
import { useNavigation } from "@react-navigation/native";
import backgroundImg from "../../assets/images/background.png";
import {
  LogOutBtn,
  ProfileCont,
  UserAvatar,
  UserName,
} from "./StyledProfileScreen";
import { Forest } from "../../Components/PostItems/Forest";
import { Sunset } from "../../Components/PostItems/Sunset";
import { Italy } from "../../Components/PostItems/Italy";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={backgroundImg}
      style={{
        resizeMode: "cover",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <ProfileCont>
        <UserAvatar>
          <AddRegisterImg
            style={{ position: "absolute", bottom: 8, right: -18 }}
          />
        </UserAvatar>
        <LogOutBtn>
          <LogOutSvg
            onPress={() => navigation.navigate("Login")}
            title="Log Out"
            color="#fff"
            style={{
              width: 24,
              height: 24,
              marginRight: 60,
              marginRight: 16,
              paddingVertical: 10,
            }}
          />
        </LogOutBtn>
        <UserName>Natali Romanova</UserName>
        <ScrollView>
          <View>
            <Forest />
            <Sunset />
            <Italy />
          </View>
        </ScrollView>
      </ProfileCont>
    </ImageBackground>
  );
};
