import Image from "next/image";

const Hero = ({ backdrop_path, release_date, title, tagline }) => {
  return (
    <section className="relative">
      <div className="overflow-hidden h-[32rem]">
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w1280/${backdrop_path}`
              : "https://placehold.co/1280x720"
          }
          alt="movie backdrop"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute bg-gradient-to-t from-black inset-0">
        <div className="mx-auto max-w-4xl h-full flex justify-start items-center px-4 md:px-0">
          <div>
            <h6 className="text-white md:text-xl p-0">{release_date}</h6>
            <h1 className="xl:text-7xl text-4xl font-black text-white xl:max-w-md md:max-w-lg 2xl:max-w-xl">
              {title.toUpperCase()}
            </h1>
            <h4 className="md:text-xl text-white italic">{tagline}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
