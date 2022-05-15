import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../utils/firebase.config";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/post.slice";

const Delete = ({ postId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId)).then(() => {
      dispatch(deletePost(postId));
    });
  };

  return (
    <span className="delet" onClick={(e) => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </span>
  );
};

export default Delete;
