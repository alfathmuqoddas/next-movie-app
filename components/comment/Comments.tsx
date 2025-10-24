"use client";

import { useState, useEffect, useCallback } from "react";
import CommentForm from "./CommentForm";
import useAuthStore from "../../store/useAuthStore";
import { deleteComment } from "../../lib/firebaseQuery";
import { getComments } from "../../lib/firebaseQuery";
import { type DocumentSnapshot } from "firebase/firestore";
import { TCommentData } from "@/lib/firebaseQuery.type";

const Comments = ({ movieId }) => {
  const [isDeleting, setisDeleting] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { userData } = useAuthStore();

  const fetchFirstPageComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setComments([]);
      setLastVisible(null);
      setHasMore(true);
      const { comments, lastVisible, hasMore } = await getComments(movieId);
      setComments(comments);
      setLastVisible(lastVisible);
      setHasMore(hasMore);
    } catch (error) {
      console.error("Error fetching comments: ", error);
      setComments([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  const fetchMoreComments = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      const {
        comments: newComments,
        lastVisible: newLastVisible,
        hasMore: newHasMore,
      } = await getComments(movieId, lastVisible);
      setComments((prevComments: TCommentData[]) => [
        ...prevComments,
        ...newComments,
      ]);
      setLastVisible(newLastVisible);
      setHasMore(newHasMore);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFirstPageComments();
  }, [fetchFirstPageComments]);

  // console.log({ comments });

  //this will be called by add comment form
  const handleCommentAdded = () => {
    fetchFirstPageComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return; // User cancelled
    }
    setisDeleting(true);
    try {
      await deleteComment(movieId, commentId);
      alert("Comment deleted successfully!");
      await fetchFirstPageComments();
    } catch (error) {
      console.error("Error deleting comment: ", error);
      alert("Error deleting comment: " + error.message);
    } finally {
      setisDeleting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-4 md:px-0" aria-label="comments">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {userData ? (
        <CommentForm id={movieId} onCommentAdded={handleCommentAdded} />
      ) : (
        <p className="my-4">Login to add a comment</p>
      )}

      {comments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {comments.map((comment: TCommentData) => (
            <article className="flex justify-between gap-4" key={comment?.id}>
              <div className="flex flex-col gap-1 rounded-2xl w-full">
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

                    {userData?.uid === comment.userId && (
                      <div>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 text-sm hover:cursor-pointer hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
          {hasMore && (
            <div className="flex justify-left mt-4">
              <button
                onClick={fetchMoreComments}
                disabled={isLoading || !hasMore}
                className="btn btn-outline btn-sm rounded-full mr-2"
              >
                {isLoading ? "Loading..." : "Load More Comments"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <article>No comments yet</article>
      )}
    </section>
  );
};

export default Comments;
