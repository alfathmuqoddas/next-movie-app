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
    <Link href={link} className="rounded-2xl w-full">
      <article className="max-w-full m-1 text-sm lg:text-base">
        <figure className="relative hover:scale-105 transition-transform duration-300">
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
          <div className="absolute top-1 right-1">
            <button
              className="btn btn-sm btn-ghost"
              onClick={handleClick}
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
    </Link>
  );
};

export default FavoriteCard;
