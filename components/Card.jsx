import Link from "next/link";

export const CardSmall = ({ link, img, title, subtitle, subtitle2, size }) => {
  return (
    <Link href={link} className="no-underline focus:underline">
      <div className={size}>
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className="rounded-2xl mb-2"
            loading="lazy"
          />
        </figure>
        <div className="hover:text-decoration-line: underline;">
          <h5 className="font-semibold">{title}</h5>
          <div className="">{subtitle}</div>
          <h6 className="">{subtitle2}</h6>
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
    <div className="flex gap-4 border-b pb-8 max-w-screen-md mb-8">
      <figure className="flex-none w-24">
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-xl"
          loading="lazy"
        />
      </figure>
      <div className="shrink">
        <h6 className="text-md">{subtitle}</h6>
        <h5 className="font-semibold text-xl">{title}</h5>
        <h6 className="">{subtitle3}</h6>
        <div
          className="mt-2 radial-progress bg-primary text-primary-content border-4 border-primary"
          style={{ "--value": subtitle2, "--size": "2rem" }}
        >
          {subtitle2}
        </div>
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
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt="card-thumbnail"
              className="rounded-2xl mb-4"
              loading="lazy"
            />
          </figure>
          <div className="">
            <h5 className="text-lg font-semibold">{title ? title : name}</h5>
            <p className="">
              {release_date
                ? release_date.substring(0, 4)
                : first_air_date.substring(0, 4)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardWrap;
