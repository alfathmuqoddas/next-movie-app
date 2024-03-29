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
    <Link href={link} className="hover:bg-neutral-900 mb-1 rounded-[28px]">
      <div className={size}>
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className="rounded-[28px] mb-2"
            loading="lazy"
          />
        </figure>
        <div className="p-2">
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
  imgSize,
}) => {
  return (
    <div className="flex hover:bg-neutral-900 rounded-[28px] mb-4 max-w-screen items-center">
      <figure className={`flex-none w-${imgSize}`}>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-[28px]"
          loading="lazy"
        />
      </figure>
      <div className="shrink leading-tight p-4">
        <h5 className="font-semibold text-xl">{title}</h5>
        <h6 className="text-md hidden lg:block">{subtitle}</h6>
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
      className="no-underline hover:bg-neutral-900 rounded-[28px] mb-2"
      href={
        media_type == "movie"
          ? `/details/${id}`
          : media_type == "tv"
          ? `details/tv/${id}`
          : `details${link}/${id}`
      }
    >
      <div className="">
        <div className={`p-0 ${size}`}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
              alt="card-thumbnail"
              className="rounded-[28px] mb-2 w-full"
              loading="lazy"
            />
          </figure>
          <div className="p-2">
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
