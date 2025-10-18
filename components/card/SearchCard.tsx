import { ReactNode } from "react";

export default function SearchCard({
  img,
  title,
  subtitle,
}: {
  img: string;
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <article className={`flex flex-col rounded-2xl items-center`}>
      <figure className={`relative flex-none w-full`}>
        <div className="absolute top-1 right-1 text-sm">{subtitle}</div>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-2xl"
          width="185"
          height="273"
          loading="lazy"
        />
      </figure>
      <div className="flex flex-col md:text-center text-left max-sm:gap-2 px-4 py-2">
        <h5 className="font-semibold text-sm">{title}</h5>
      </div>
    </article>
  );
}
