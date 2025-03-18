"use client";

import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/router";
import { addComment } from "../lib/firebaseQuery";

const CommentForm = ({ id }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { userData } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  useEffect(() => {
    if (errorMessage) {
      alert(`Error: ${errorMessage}`);
      // Optionally clear the error message after displaying the alert
      setErrorMessage("");
    }
  }, [errorMessage]);

  // Optional: Effect to display success alerts
  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      // Optionally clear the success message after displaying the alert
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
      router.reload();
    } else {
      setErrorMessage(result?.error || "Error adding comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={commentText}
        onChange={handleChange}
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
