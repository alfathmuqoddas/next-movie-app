import Link from "next/link";

export interface ICastCard {
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

export default function CastCard({ link, img, title, subtitle }: ICastCard) {
  return (
    <Link
      href={link}
      className="focus:bg-neutral-900 rounded-2xl"
      title={title}
    >
      <article className="w-24 lg:w-36 mx-1 md:mx-2 mt-2 mb-0 text-sm lg:text-base">
        <figure>
          <img
            src={img}
            alt="cast-thumbnail"
            className="h-24 lg:h-36 w-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="185"
            height="278"
          />
        </figure>
        <div className="py-2 text-center">
          <h5 className="font-semibold line-clamp-2">{title}</h5>
          <p className="font-light line-clamp-2">{subtitle}</p>
        </div>
      </article>
    </Link>
  );
}
