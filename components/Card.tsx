import Link from "next/link";
import { ReactNode } from "react";
import RadialRating from "./RadialRating";
// import Image from "next/image";

export const CardGrid = ({
  link,
  img,
  imgWidth = "185",
  imgHeight = "278",
  title,
  subtitle,
}: {
  link: string;
  img: string;
  imgWidth?: string;
  imgHeight?: string;
  title: string;
  subtitle?: string;
}) => {
  return (
    <Link href={link} className="rounded-2xl w-full" title={title}>
      <article className="max-w-full mx-2 mt-2 mb-0 text-sm lg:text-base">
        <figure>
          <img
            src={img}
            alt="cardSmall-thumbnail"
            className={`rounded-2xl hover:scale-105 transition-transform duration-300`}
            loading="lazy"
            width={imgWidth}
            height={imgHeight}
          />
        </figure>
        <div className="py-2 text-center">
          <h5 className="font-semibold line-clamp-2">{title}</h5>
          <p className="font-light line-clamp-2">{subtitle}</p>
        </div>
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
}: {
  img: string;
  imgWidth?: string;
  imgHeight?: string;
  title?: string | ReactNode;
  subtitle?: string;
  video?: boolean;
  cast?: boolean;
  link?: string;
  subtitle2?: string | ReactNode;
  subtitle3?: ReactNode;
  subtitle4?: string;
  flexType?: string;
  cardBodyPadding?: string;
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

export const CardWrap = ({
  content,
  size,
  link,
  type = "front",
}: {
  content: any;
  size: string;
  link?: string;
  type?: string;
}) => {
  const { id, poster_path, title, name, media_type, vote_average } = content;
  return (
    <Link
      className="no-underline focus:bg-neutral-900 rounded-2xl"
      href={
        media_type == "movie"
          ? `/details/movie/${id}`
          : media_type == "tv"
          ? `/details/tv/${id}`
          : `/details${link}/${id}`
      }
    >
      <article
        className={`p-0 ${size} ${
          type === "front" ? "m-2" : "m-1"
        } mb-0 text-sm lg:text-base`}
      >
        <figure className="relative hover:scale-105 transition-transform duration-300">
          <div className="absolute top-1 right-1">
            <RadialRating rating={vote_average} size="2rem" />
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt="card-thumbnail"
            className="rounded-2xl w-full "
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
