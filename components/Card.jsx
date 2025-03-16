import Link from "next/link";
// import Image from "next/image";

export const CardSmall = ({
  link,
  img,
  imgWidth = "185",
  imgHeight = "278",
  title,
  subtitle,
  flexSubtitle1,
  size,
  flexSubtitle2,
  video = false,
  cast = false,
}) => {
  return (
    <Link
      href={link}
      className="focus:bg-neutral-900 rounded-[16px]"
      title={video ? subtitle : title}
    >
      <article
        className={`${
          !video ? "w-24 lg:w-36" : "w-32 lg:w-64"
        } mx-2 mt-2 mb-0 text-sm lg:text-base`}
      >
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className={`rounded-[16px] ${
              video && "border border-neutral-500"
            } ${
              cast && "h-24 lg:h-36 w-full object-cover rounded-full"
            } hover:scale-105 transition-transform duration-300`}
            loading="lazy"
            width={imgWidth}
            height={imgHeight}
          />
        </figure>
        {title && (
          <div
            className={`py-2 ${
              video
                ? "flex gap-2 text-left flex-col md:flex-row"
                : "text-center"
            }`}
          >
            <h5 className="font-semibold line-clamp-2">{title}</h5>
            <p
              className={`font-light ${video && "font-semibold"} line-clamp-2`}
            >
              {subtitle}
            </p>
          </div>
        )}
      </article>
    </Link>
  );
};

export const CardHorizontal = ({
  img,
  imgWidth,
  imgHeight,
  title,
  subtitle,
  subtitle2,
  subtitle3,
  subtitle4,
  flexType = "items-start",
  cardBodyPadding = "p-4",
}) => {
  return (
    <article
      className={`flex active:bg-neutral-900 rounded-[16px] max-w-screen ${flexType}`}
    >
      <figure className={`flex-none w-20 lg:w-36`}>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-[16px]"
          width={imgWidth}
          height={imgHeight}
          loading="lazy"
        />
      </figure>
      <div className={`${cardBodyPadding}`}>
        <h5 className="font-semibold">{title}</h5>
        <p className="text-sm line-clamp-4 hidden lg:flex">{subtitle}</p>
        <div className="text-sm">{subtitle2}</div>
        <div className="text-sm">{subtitle3}</div>
        <div className="text-sm">{subtitle4}</div>
      </div>
    </article>
  );
};

export const CardWrap = ({ content, size, link }) => {
  const {
    id,
    poster_path,
    release_date,
    title,
    first_air_date,
    name,
    media_type,
  } = content;
  return (
    <Link
      className="no-underline focus:bg-neutral-900 rounded-[16px]"
      href={
        media_type == "movie"
          ? `/details/movie/${id}`
          : media_type == "tv"
          ? `details/tv/${id}`
          : `details${link}/${id}`
      }
    >
      <article className={`p-0 ${size} m-2 mb-0`}>
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt="card-thumbnail"
            className="rounded-[16px] w-full hover:scale-105 transition-transform duration-300"
            width="342"
            height="513"
            loading="lazy"
          />
        </figure>
        <div className="py-2 px-1 xl:py-4">
          <h5 className="font-semibold text-center">{title || name}</h5>
        </div>
      </article>
    </Link>
  );
};

export default CardWrap;
