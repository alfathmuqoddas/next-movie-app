const Hero = ({ backdrop_path, release_date, title, tagline }) => {
  return (
    <div className="relative">
      <img
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w1280/${backdrop_path}`
            : "https://placehold.co/1280x720"
        }
        alt="movie backdrop"
        className="object-cover min-w-full"
      />
      <div className="absolute bg-gradient-to-t from-black inset-0">
        <div className="absolute p-5 top-1/2 transform -translate-y-1/2 left-4">
          <h6 className="text-white md:text-xl p-0">{release_date}</h6>
          <h1 className="text-xl xl:text-7xl md:text-5xl font-black text-white">
            {title.toUpperCase()}
          </h1>
          <h4 className="md:text-xl text-white italic">{tagline}</h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
