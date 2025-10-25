import Link from "next/link";
import { Play } from "lucide-react";

export interface IVideoCard {
  link: string;
  img: string;
  subtitle: string;
}

export default function VideoCard({ link, img, subtitle }: IVideoCard) {
  return (
    <Link
      href={link}
      className="focus:bg-neutral-900 rounded-2xl"
      title={subtitle}
    >
      <article className="w-36 lg:w-64 mx-1 md:mx-2 mt-2 mb-0 text-sm lg:text-base">
        <figure className="relative hover:scale-105 transition-transform duration-300">
          <img
            src={img}
            alt="video-thumbnail"
            className="rounded-2xl border border-neutral-500 "
            loading="lazy"
            width={480}
            height={360}
          />
          <div className="absolute inset-0 rounded-2xl bg-black/30 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={32} color="white" />
          </div>
        </figure>
        <div className="py-2 flex gap-2 text-left flex-col md:flex-row">
          <h5 className="font-semibold line-clamp-2">{subtitle}</h5>
        </div>
      </article>
    </Link>
  );
}
