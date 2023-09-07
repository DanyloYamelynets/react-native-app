import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtlUYy4NtFHPHv6I7qICNcmnpYGuAUP3Q",
  authDomain: "my-app-rn-6bc12.firebaseapp.com",
  databaseURL:
    "https://my-app-rn-6bc12-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-rn-6bc12",
  storageBucket: "my-app-rn-6bc12.appspot.com",
  messagingSenderId: "65383893448",
  appId: "1:65383893448:web:d98f878dd37f2e6adad8fd",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
