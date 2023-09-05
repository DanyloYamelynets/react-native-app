import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXww40UZ4FADVyB5XEmimw5_0jcQbVu7g",
  authDomain: "react-native-goit-bdcef.firebaseapp.com",
  databaseURL:
    "https://react-native-goit-bdcef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-goit-bdcef",
  storageBucket: "react-native-goit-bdcef.appspot.com",
  messagingSenderId: "792626960428",
  appId: "1:792626960428:web:0b4ea139d2224a2b6d1989",
  measurementId: "G-1GY21HG3E6",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
