"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/router";

const CommentForm = ({ id }) => {
  const [content, setContent] = useState("");
  const { userData } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, "commentsByMovieId", id.toString(), "comments"),
        {
          userId: userData.uid,
          userName: userData.displayName,
          content: content,
          userDisplayPicture: userData.photoURL,
          createdAt: serverTimestamp(),
        }
      );
      alert("Comment added successfully!");
      setContent("");
      router.reload();
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Error adding comment: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={content}
        onChange={handleChange}
        placeholder="Add a comment..."
        className="w-full rounded-lg border border-neutral-500 p-2 text-sm"
      />
      <button
        type="submit"
        className="btn btn-sm bg-blue-500 rounded-full text-white hover:bg-blue-600 mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
