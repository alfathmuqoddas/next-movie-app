const Comments = ({ comments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length > 0 ? (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <figure>
                  <img
                    src={comment.userDisplayPicture}
                    alt="user-profile"
                    className="w-8 h-8 rounded-full"
                  />
                </figure>
                <div className="text-xl font-semibold">{comment.userName}</div>
              </div>
              <div>{comment.content}</div>
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
