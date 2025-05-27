"use client";

import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import useAuthStore from "../store/useAuthStore";
import { deleteComment } from "../lib/firebaseQuery";
import { useRouter } from "next/navigation";
import { getComments } from "../lib/firebaseQuery";

const Comments = ({ movieId }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const comments = await getComments(movieId);
        setComments(comments);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [movieId]);

  const handleDeleteComment = async (movieId, commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setIsDisabled(true);
      try {
        await deleteComment(movieId, commentId);
        alert("Comment deleted successfully!");
        setIsDisabled(false);
        router.reload();
      } catch (error) {
        console.error("Error deleting comment: ", error);
        alert("Error deleting comment: " + error.message);
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="max-w-5xl px-4 mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {userData ? (
        <CommentForm id={movieId} />
      ) : (
        <p className="my-4">Login to add a comment</p>
      )}
      {comments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div className="flex justify-between gap-4" key={comment.id}>
              <div
                key={comment.id}
                className="flex flex-col gap-1 rounded-2xl w-full"
              >
                <div className="flex gap-4">
                  <figure>
                    <img
                      src={
                        comment?.userDisplayPicture
                          ? comment.userDisplayPicture
                          : `https://avatar.iran.liara.run/username?username=${comment.userName}`
                      }
                      alt="user-profile"
                      className="w-8 h-8 rounded-full mt-2"
                    />
                  </figure>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h5 className="font-semibold">{comment.userName}</h5>
                      <p className="text-xs">{comment.createdAt}</p>
                    </div>
                    <p>{comment.content}</p>

                    {userData?.uid === comment.userId ? (
                      <div>
                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            handleDeleteComment(movieId, comment.id)
                          }
                          className="text-red-500 text-sm hover:cursor-pointer hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </section>
  );
};

export default Comments;
