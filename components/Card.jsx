import Link from "next/link";

export const CardSmall = ({
  link,
  img,
  title,
  subtitle,
  flexSubtitle1,
  size,
  flexSubtitle2,
}) => {
  return (
    <Link href={link} className="no-underline focus:underline hover:underline">
      <div className={size}>
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className="rounded-2xl mb-2"
            loading="lazy"
          />
        </figure>
        <div className="">
          <h5 className="font-semibold">{title}</h5>
          <h6 className="font-light">{subtitle}</h6>
          <div className="flex">
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
}) => {
  return (
    <div className="flex items-center gap-4 border-b pb-8 max-w-screen mb-8">
      <figure className="flex-none w-24">
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-xl"
          loading="lazy"
        />
      </figure>
      <div className="shrink">
        <h5 className="font-semibold text-xl">{title}</h5>
        <h6 className="text-md py-2">{subtitle}</h6>
        <div className="font-light">{subtitle2}</div>
        <div>{subtitle3}</div>
      </div>
    </div>
  );
};

export const CardWrap = ({
  id,
  poster_path,
  release_date,
  title,
  size,
  first_air_date,
  name,
  media_type,
  link,
}) => {
  return (
    <Link
      className="no-underline focus:underline"
      href={
        media_type == "movie"
          ? `/details/${id}`
          : media_type == "tv"
          ? `details/tv/${id}`
          : `details${link}/${id}`
      }
    >
      <div className="">
        <div className={size}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
              alt="card-thumbnail"
              className="rounded-2xl mb-4"
              loading="lazy"
            />
          </figure>
          <div className="">
            <h5 className="font-semibold">
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
