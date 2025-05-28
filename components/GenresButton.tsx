const GenresButton = ({ genres }: { genres: any }) => {
  <>
    <div className="my-2 md:my-5 flex gap-y-2 flex-wrap">
      {genres.map((genre: any) => (
        <div
          key={genre.name}
          className="badge badge-lg badge-outline rounded-full mr-2 p-2 md:p-3"
        >
          {genre.name}
        </div>
      ))}
    </div>
  </>;
};

export default GenresButton;
