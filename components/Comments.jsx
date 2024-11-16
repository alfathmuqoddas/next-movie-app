import { useState } from "react";
import CommentForm from "./CommentForm";
import useAuthStore from "../store/useAuthStore";
import { handleDeleteComment } from "../lib/firebaseQuery";
import { useRouter } from "next/router";

const Comments = ({ comments, movieId }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { userData } = useAuthStore();
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {userData ? (
        <CommentForm id={movieId} />
      ) : (
        <div className="my-4">Login to add a comment</div>
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
                      <div className="font-semibold">{comment.userName}</div>
                      <div className="text-xs">{comment.createdAt}</div>
                    </div>
                    <div>{comment.content}</div>

                    {userData?.uid === comment.userId ? (
                      <div>
                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            handleDeleteComment(
                              movieId,
                              comment.id,
                              router,
                              setIsDisabled
                            )
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
    </div>
  );
};

export default Comments;
