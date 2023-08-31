import styled from "styled-components/native";

export const ProfileCont = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: flex-start;
  align-items: center;
  max-height: 627px;
  margin-top: 103px;
  width: 100%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: relative;
`;
export const UserAvatar = styled.View`
  position: absolute;
  top: -60px;
  width: 120px;
  height: 120px;
  border-radius: 16px;
  background-color: #f6f6f6;
`;
export const UserName = styled.Text`
  margin-top: 92px;
  text-align: center;
  margin-bottom: 33px;
  font-family: "Roboto-Medium";
  font-size: 30px;
`;
export const LogOutBtn = styled.Pressable`
  position: absolute;
  top: 22px;
  right: 16px;
`;

