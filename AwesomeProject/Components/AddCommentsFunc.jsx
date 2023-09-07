import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../redux/firebase/config";

export const addCommentToFirebase = async (comment) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), comment);
    console.log("Comment added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
  }
};

export const getAllCommentsFromFirebase = async () => {
  const commentCollection = collection(db, "comments");
  const querySnapshot = await getDocs(commentCollection);
  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  return comments;
};
