import Link from "next/link";

export const CardSmall = ({ img, title, subtitle, subtitle2 }) => {
  return (
    <div className="">
      <div className="w-36">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w185/${img}`}
            alt="cardSmall-thumbnail"
            className="rounded-2xl mb-2"
            loading="lazy"
          />
        </figure>
        <div className="">
          <h5 className="font-semibold">{title}</h5>
          <h6 className="">{subtitle}</h6>
          <h6 className="">{subtitle2}</h6>
        </div>
      </div>
    </div>
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

export const CardYoutube = ({ link, img, title, subtitle }) => {
  return (
    <a
      href={`https://youtube.com/watch?v=${link}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-64">
        <figure>
          <img
            src={`https://img.youtube.com/vi/${img}/0.jpg`}
            alt="cardSmall-thumbnail"
            className="rounded-2xl mb-2"
            loading="lazy"
          />
        </figure>
        <div>
          <h5 className="font-semibold">{title}</h5>
          <h6>{subtitle}</h6>
        </div>
      </div>
    </a>
  );
};

export const CardWrap = ({ id, poster_path, release_date, title }) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="">
        <div className="w-48 xl:w-64">
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

export const CardWrap2 = ({ id, poster_path, release_date, title }) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="">
        <div className="">
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
