import Link from "next/link";

export interface IGalleryCard {
  img: string;
  link: string;
}

export default function GalleryCard({ img, link }: IGalleryCard) {
  return (
    <Link
      href={link}
      className="focus:bg-neutral-900 rounded-[16px]"
      title={link}
    >
      <article className="w-24 lg:w-36 mx-2 mt-2 mb-2 text-sm lg:text-base">
        <figure>
          <img
            src={img}
            alt="gallery-thumbnail"
            className={`rounded-[16px] hover:scale-105 transition-transform duration-300`}
            loading="lazy"
            width={185}
            height={278}
          />
        </figure>
      </article>
    </Link>
  );
}
