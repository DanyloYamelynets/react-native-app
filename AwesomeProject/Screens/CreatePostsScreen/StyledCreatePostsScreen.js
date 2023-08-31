import styled from "styled-components/native";

export const ImgCont = styled.View`
  margin-top: 32px;
  width: 100%;
  padding: 0 16px;
`;
export const PostImg = styled.ImageBackground`
  align-items: center;
  justify-content: center;
  height: 240px;
  max-height: 240px;
  margin-bottom: 8px;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
export const LoadBtn = styled.Pressable`
  align-items: center;
  align-content: center;
  width: 60px;
  height: 60px;
  padding: 18px;
  color: #bdbdbd;
  background-color: #ffffff;
  border-radius: 50px;
`;
export const LoadText = styled.Text`
  color: #bdbdbd;
  font-size: 16px;
  font-family: Roboto;
`;
export const TitleInput = styled.TextInput`
  font-size: 16px;
  padding-top: 48px;
  padding-bottom: 15px;
  color: #212121;
  border-bottom-width: 1px;
  border-color: ${(props) => (props.isFocused ? "#FF6C00" : "#e8e8e8")};
`;
export const LocationInputCont = styled.View`
  position: relative;
  padding-top: 32px;
  padding-bottom: 15px;
  align-content: center;
  color: #212121;
  border-bottom-width: 1px;
  border-color: ${(props) => (props.isFocused ? "#FF6C00" : "#e8e8e8")};
`;
export const LocationInput = styled.TextInput`
  font-size: 16px;
  margin-left: 28px;
`;
export const PostBtn = styled.Pressable`
  margin-top: 32px;
  padding: 16px 0;
  background-color: #f6f6f6;
  border-radius: 100px;
`;
export const BtnText = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  text-align: center;
  color: #bdbdbd;
`;
export const TrashBtn = styled.Pressable`
  margin-bottom: 34px;
  width: 70px;
  height: 40px;
  background-color: #f6f6f6;
  border-radius: 20px;
  padding: 8px 0;
  align-items: center;
`;
