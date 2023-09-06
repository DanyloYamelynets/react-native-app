import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { registerUser, logIn } from "./authSlice";

export const signInUser =
  ({ login, email, password, avatar }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: login,
        photoURL: avatar,
      });

      dispatch(registerUser({ login, email, password, avatar }));

      return user;
    } catch (error) {
      return error.code;
    }
  };

export const logInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const login = user.displayName || null;
      const avatar = user.photoURL || null;

      dispatch(logIn({ login, email, password, avatar }));

      return user;
    } catch (error) {
      return error.code;
    }
  };
