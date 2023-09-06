import { storage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addPost,
  loadPostsFailure,
  loadPostsStart,
  loadPostsSuccess,
} from "./postsSlice";

export const loadPostsFromFirebase = () => {
  return async (dispatch) => {
    try {
      dispatch(loadPostsStart());

      const posts = await fetchPostsFromFirebase();

      dispatch(loadPostsSuccess(posts));
    } catch (error) {
      dispatch(loadPostsFailure(error.message));
    }
  };
};

export const savePostToFirebase = (post) => {
  return async (dispatch) => {
    try {
      const imageUrl = await uploadImageToFirebase(post.postImg);
      const savedPost = { ...post, postImg: imageUrl };

      const postId = await savePostDataToFirebase(savedPost);

      dispatch(addPost({ ...savedPost, id: postId }));
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };
};
