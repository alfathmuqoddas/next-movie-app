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
    <article
      className={`flex flex-row md:flex-col active:bg-neutral-900 rounded-[16px] max-w-screen items-center`}
    >
      <figure className={`relative flex-none w-20 lg:w-32`}>
        <div className="absolute top-1 right-1 text-xs">{subtitle}</div>
        <img
          src={img}
          alt="cardSmall-thumbnail"
          className="rounded-[16px]"
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
