"use client";

import { useState, useEffect, FormEvent } from "react";
import useAuthStore from "../../store/useAuthStore";
import { addComment } from "../../lib/firebaseQuery";

const MAX_COMMENT_LENGHT = 280;

const CommentForm = ({ id, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { userData } = useAuthStore();

  const char_remaining = MAX_COMMENT_LENGHT - commentText.length;
  const charIsOverlimit = commentText.length >= MAX_COMMENT_LENGHT;

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    try {
      const result = await addComment(id, payload);

      if (result?.success) {
        setCommentText("");
        setSuccessMessage("Comment added successfully!");
        onCommentAdded();
      } else {
        setErrorMessage(result?.error || "Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Error adding comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative w-full lg:w-1/2">
        <textarea
          id="comment-form"
          value={commentText}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.length <= MAX_COMMENT_LENGHT) {
              setCommentText(newValue);
            }
          }}
          placeholder="Add a comment..."
          className={`w-full rounded-xl p-2 text-sm text-white focus:outline-none focus:ring-1 resize-y pr-16 ${
            // pr-16 to make space for counter
            charIsOverlimit
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-500 focus:ring-blue-500"
          }`}
          rows={3}
          disabled={isSubmitting}
        />
        <p
          className={`absolute bottom-2 right-2 text-xs ${
            charIsOverlimit ? "text-red-400" : "text-gray-400"
          }`}
        >
          {char_remaining}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || charIsOverlimit || !commentText.trim()}
        className="btn btn-sm bg-blue-500 rounded-full text-white hover:bg-blue-600 mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
