import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSelectors";
import { useNavigation } from "@react-navigation/native";

const AuthChecker = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, [isLoggedIn, navigation]);

  return null;
};

export default AuthChecker;
