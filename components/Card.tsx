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
      <article className="max-w-full m-1 text-sm lg:text-base">
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
  children,
  vote_average,
}: {
  img: string;
  imgWidth?: string;
  imgHeight?: string;
  title?: string | ReactNode;
  vote_average?: number;
  children: ReactNode;
}) => {
  return (
    <article
      className={`flex active:bg-neutral-900 rounded-2xl w-full items-center`}
    >
      <figure className={`relative flex-none w-24 lg:w-32`}>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-2xl"
          width={imgWidth}
          height={imgHeight}
          loading="lazy"
        />
        <div className="absolute top-1 right-1 text-xs">
          <RadialRating rating={vote_average} size="2rem" />
        </div>
      </figure>
      {children}
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
          type === "front" ? "m-2" : "m-1 md:m-2"
        } mb-0 text-sm lg:text-base`}
      >
        <figure className="relative hover:scale-105 transition-transform duration-300">
          <div className="absolute top-1 right-1 text-xs md:text-sm">
            <RadialRating rating={vote_average} size="2rem" />
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            alt="card-thumbnail"
            className="rounded-2xl w-full "
            width="185"
            height="278"
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
