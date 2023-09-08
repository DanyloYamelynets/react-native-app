import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../redux/firebase/config";

export const addCommentToFirebase = async (comment, postId) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      ...comment,
      postId: postId,
    });
    console.log("Comment added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
  }
};

export const getCommentsForPostFromFirebase = async (postId) => {
  const commentCollection = collection(db, "comments");
  const q = query(commentCollection, where("postId", "==", postId));
  const querySnapshot = await getDocs(q);
  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  return comments;
};
