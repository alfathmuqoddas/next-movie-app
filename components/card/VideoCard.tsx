import Link from "next/link";
import YoutubeIcons from "../YoutubeIcons";

export interface IVideoCard {
  link: string;
  img: string;
  subtitle: string;
}

export default function VideoCard({ link, img, subtitle }: IVideoCard) {
  return (
    <Link
      href={link}
      className="focus:bg-neutral-900 rounded-[16px]"
      title={subtitle}
    >
      <article className="w-32 lg:w-64 mx-2 mt-2 mb-0 text-sm lg:text-base">
        <figure>
          <img
            src={img}
            alt="video-thumbnail"
            className="rounded-[16px] border border-neutral-500 hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width={480}
            height={360}
          />
        </figure>
        <div className="py-2 flex gap-2 text-left flex-col md:flex-row">
          <YoutubeIcons />
          <h5 className="font-semibold line-clamp-2">{subtitle}</h5>
        </div>
      </article>
    </Link>
  );
}
