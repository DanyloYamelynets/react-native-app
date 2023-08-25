import styled from "styled-components/native";

export const RegisterCont = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  max-height: 549px;
  width: 100%;
  padding: 92px 16px 78px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  position: relative;
`;
export const UserPhoto = styled.View`
  width: 120px;
  height: 120px;
  background-color: #f6f6f6;
  border-radius: 16px;
  position: absolute;
  top: -60px;
`;
export const RegisterForm = styled.View`
  position: relative;
  width: 100%;
  flex: 1;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 43px;
  margin-top: 33px;
`;
export const StyledInput = styled.TextInput`
  height: 50px;
  background-color: #f6f6f6;
  border-width: 1px;
  border-style: solid;
  border-color: #e8e8e8;
  padding: 0 16px;
  border-radius: 8px;
  font-family: "Roboto";
  font-size: 16px;
  color: #212121;
`;
export const RegisterBtn = styled.TouchableOpacity`
  height: 51px;
  background-color: #ff6c00;
  width: 100%;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
