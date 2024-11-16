"use client";

import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/router";
import { addComment } from "../lib/firebaseQuery";

const CommentForm = ({ id }) => {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { userData } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const payload = {
    userId: userData?.uid || "",
    userName: userData?.displayName || "",
    content: content || "",
    userDisplayPicture: userData?.photoURL || "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      await addComment(id, payload);
      setContent("");
      alert("Comment added successfully!");
      setIsDisabled(false);
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
        disabled={isDisabled}
        className="btn btn-sm bg-blue-500 rounded-full text-white hover:bg-blue-600 mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
