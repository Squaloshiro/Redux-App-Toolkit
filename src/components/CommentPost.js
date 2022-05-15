import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth, db } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { addComment } from "../features/post.slice";

const CommentPost = ({ post }) => {
  const [user, setUser] = useState(null);
  const anserContent = useRef();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleComment = (e) => {
    e.preventDefault();
    let data = [];

    if (post.comments === null) {
      data = [
        {
          commentAuthor: user.displayName,
          text: anserContent.current.value,
        },
      ];
    } else {
      data = [
        ...post.comments,
        {
          commentAuthor: user.displayName,
          text: anserContent.current.value,
        },
      ];
    }

    updateDoc(doc(db, "posts", post.id), { comments: data }).then(() => {
      dispatch(addComment([post.id, data]));
      anserContent.current.value = "";
    });
  };

  return (
    <div className="comment-container">
      <h5 className="comment-title">Comments</h5>
      {post.comments && post.comments.map((comment, index) => <CommentCard key={index} comment={comment} />)}
      {user ? (
        <form onSubmit={(e) => handleComment(e)}>
          <textarea placeholder="send comment" ref={anserContent}></textarea>
          <input type="submit" value="send" />
        </form>
      ) : (
        <p>you must be connected in to post a comment</p>
      )}
    </div>
  );
};

export default CommentPost;
