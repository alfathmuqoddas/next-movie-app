import Link from "next/link";

interface ICardSmall {
  link: string;
  img: string;
  title: string;
  subtitle: string;
  flexSubtitle1: React.ReactNode | string;
  size: string;
  flexSubtitle2: React.ReactNode | string;
}

export const CardSmall: React.FC<ICardSmall> = ({
  link,
  img,
  title,
  subtitle,
  flexSubtitle1,
  size,
  flexSubtitle2,
}) => {
  return (
    <Link href={link} className="focus:bg-neutral-900 mb-1 rounded-[16px]">
      <div className={size}>
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className="rounded-[16px] mb-2"
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

interface ICardHorizontal {
  img: string;
  title: string;
  subtitle: string;
  subtitle2: string;
  subtitle3: string;
  subtitle4: string;
  imgSize: string;
  flexType: string;
  cardBodyPadding: string;
}

export const CardHorizontal: React.FC<ICardHorizontal> = ({
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
      className={`flex active:bg-neutral-900 rounded-[16px] mb-8 max-w-screen ${flexType}`}
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

export interface ICardWrap {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  size?: string;
  first_air_date: string;
  name: string;
  media_type: "movie" | "tv";
  link?: string;
}

export const CardWrap: React.FC<ICardWrap> = ({
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
              src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
              alt="card-thumbnail"
              className="rounded-[16px] mb-2 w-full"
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
