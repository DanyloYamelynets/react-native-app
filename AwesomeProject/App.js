import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Button,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens/Home/Home";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { HeaderBackButton } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { MapScreen } from "./Screens/MapScreen/MapScreen";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              title: "Коментарі",
              headerTitleAlign: "center",
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0, 0, 0, 0.15)",
              },
              headerLeft: () => (
                <View style={{ marginLeft: 16 }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons
                      name="arrow-back-sharp"
                      size={24}
                      color="rgba(33, 33, 33, 0.80)"
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              title: "Геолокація",
              headerTitleAlign: "center",
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0, 0, 0, 0.15)",
              },
              headerLeft: () => (
                <View style={{ marginLeft: 16 }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons
                      name="arrow-back-sharp"
                      size={24}
                      color="rgba(33, 33, 33, 0.80)"
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}
