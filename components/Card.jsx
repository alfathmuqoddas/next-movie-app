import Link from "next/link";
// import Image from "next/image";

export const CardSmall = ({
  link,
  img,
  title,
  subtitle,
  flexSubtitle1,
  size,
  flexSubtitle2,
  video = false,
}) => {
  return (
    <Link href={link} className="focus:bg-neutral-900 mb-1 rounded-[16px]">
      <div className={size}>
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className="rounded-[16px]"
            loading="lazy"
          />
        </figure>
        <div className={`${video ? "text-left py-2" : "text-center xl:py-4"}`}>
          <h5 className="font-semibold">{title}</h5>
          <h6 className="font-light">{subtitle}</h6>
          <div className="flex gap-2">
            <div>{flexSubtitle1}</div>
            <div>{flexSubtitle2}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CardHorizontal = ({
  img,
  title,
  subtitle,
  subtitle2,
  subtitle3,
  subtitle4,
  imgSize,
  flexType = "items-start",
  cardBodyPadding = "p-4",
}) => {
  return (
    <div
      className={`flex active:bg-neutral-900 rounded-[16px] max-w-screen ${flexType}`}
    >
      <figure className={`flex-none w-${imgSize}`}>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-[16px]"
          loading="lazy"
        />
      </figure>
      <div className={`shrink leading-tight ${cardBodyPadding}`}>
        <h5 className="font-semibold text-xl pb-4">{title}</h5>
        <p className="text-sm hidden lg:block pb-2">{subtitle}</p>
        <div className="text-sm">{subtitle2}</div>
        <div className="text-sm">{subtitle3}</div>
        <div className="text-sm">{subtitle4}</div>
      </div>
    </div>
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
      className="no-underline focus:bg-neutral-900 rounded-[16px] mb-2"
      href={
        media_type == "movie"
          ? `/details/movie/${id}`
          : media_type == "tv"
          ? `details/tv/${id}`
          : `details${link}/${id}`
      }
    >
      <div className="">
        <div className={`p-0 ${size}`}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt="card-thumbnail"
              className="rounded-[16px] w-full"
              loading="lazy"
            />
          </figure>
          <div className="py-2 px-1 xl:py-4">
            <h5 className="font-semibold text-center">
              {title ? title : name} (
              {release_date
                ? release_date.substring(0, 4)
                : first_air_date.substring(0, 4)}
              )
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardWrap;
