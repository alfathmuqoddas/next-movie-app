import { Trash2 as Trash } from "lucide-react";
import Link from "next/link";

const FavoriteCard = ({
  link,
  title,
  poster_path,
  handleClick,
  subtitle,
}: {
  link: string;
  title: string;
  poster_path: string;
  handleClick: any;
  subtitle: string;
}) => {
  return (
    <article className="max-w-full m-1 text-sm lg:text-base">
      <figure className="relative hover:scale-105 transition-transform duration-300">
        <Link href={link} className="rounded-2xl w-full">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                : "https://placehold.co/185x278?text=Data+Unavailable"
            }
            alt="cardSmall-thumbnail"
            className={"rounded-2xl"}
            loading="lazy"
            width={185}
            height={278}
          />
        </Link>

        <div className="absolute top-1 right-1">
          <button
            className="btn btn-sm btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            title="Remove from favorites"
          >
            <Trash size={20} className="text-red-500" />
          </button>
        </div>
      </figure>
      <div className="py-2 text-center">
        <h5 className="font-semibold line-clamp-2">{title}</h5>
        <p className="font-light line-clamp-2">{subtitle}</p>
      </div>
    </article>
  );
};

export default FavoriteCard;
