import Link from "next/link";

export const CardSmall = ({ link, img, title, subtitle, subtitle2, size }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
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
          <div className="">{subtitle}</div>
          <h6 className="">{subtitle2}</h6>
        </div>
      </div>
    </a>
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
      <figure className="flex-none w-24 xl:w-36">
        <img
          src={`https://image.tmdb.org/t/p/w185/${img}`}
          alt="cardSmall-thumbnail"
          className="rounded-xl"
          loading="lazy"
        />
      </figure>
      <div className="shrink">
        <h6 className="text-md">{subtitle}</h6>
        <h5 className="font-semibold text-2xl">{title}</h5>
        <div
          className="mt-2 radial-progress bg-primary text-primary-content border-4 border-primary"
          style={{ "--value": subtitle2, "--size": "2rem" }}
        >
          {subtitle2}
        </div>
        <h6 className="">{subtitle3}</h6>
      </div>
    </div>
  );
};

export const CardWrap = ({ id, poster_path, release_date, title, size }) => {
  return (
    <Link href={`/details/${id}`}>
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
            <h5 className="text-lg font-semibold">{title}</h5>
            <p className="">{release_date.substring(0, 4)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardWrap;
