"use client";

import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import { addComment } from "../lib/firebaseQuery";

const CommentForm = ({ id }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      alert(`Error: ${errorMessage}`);
      setErrorMessage("");
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      setSuccessMessage("");
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setErrorMessage("Comment cannot be empty");
      return;
    }

    if (!userData?.uid) {
      setErrorMessage("You must be logged in to add a comment");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      userId: userData?.uid || "",
      userName: userData?.displayName || "",
      content: commentText || "",
      userDisplayPicture: userData?.photoURL || "",
    };

    const result = await addComment(id, payload);
    setIsSubmitting(false);
    if (result?.success) {
      setCommentText("");
      setSuccessMessage("Comment added successfully!");
      router.refresh();
    } else {
      setErrorMessage(result?.error || "Error adding comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="w-full rounded-lg border border-neutral-500 p-2 text-sm"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-sm bg-blue-500 rounded-full text-white hover:bg-blue-600 mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
