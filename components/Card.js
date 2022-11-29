import Image from "next/image";

const Card = ({ img, title, year, rating }) => {
  return (
    <div className="">
      <div className="w-48 xl:w-64">
        <figure>
          <Image
            src={`https://image.tmdb.org/t/p/w342/${img}`}
            alt="card-thumbnail"
            width={342}
            height={513}
            quality={75}
            className="rounded-2xl mb-4"
          />
        </figure>
        <div className="">
          <h5 className="text-lg font-semibold">{title}</h5>
          <p className="">{year}</p>
          <p className="">{rating}</p>
        </div>
      </div>
    </div>
  );
};

export const CardSmall = ({ img, title, subtitle, subtitle2 }) => {
  return (
    <div className="">
      <div className="w-36">
        <figure>
          <Image
            src={`https://image.tmdb.org/t/p/w185/${img}`}
            alt="cardSmall-thumbnail"
            width={185}
            height={278}
            quality={75}
            className="rounded-2xl mb-2"
          />
        </figure>
        <div className="">
          <h5 className="font-semibold">{title}</h5>
          <h6 className="">{subtitle}</h6>
          <h6 className="">{subtitle2}</h6>
        </div>
      </div>
    </div>
  );
};

export const CardHorizontal = ({
  img,
  title,
  subtitle,
  subtitle2,
  subtitle3,
}) => {
  return (
    <div className="flex gap-4 border-b pb-8 max-w-screen-md mb-8">
      <figure className="flex-none w-24">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${img}`}
          alt="cardSmall-thumbnail"
          width={185}
          height={278}
          quality={75}
          className="rounded-xl"
        />
      </figure>
      <div className="shrink">
        <h6 className="text-md">{subtitle}</h6>
        <h5 className="font-semibold text-2xl">{title}</h5>
        <div
          className="mt-2 radial-progress bg-primary text-primary-content border-4 border-primary"
          style={{ "--value": subtitle2, "--size": "2rem" }}
        >
          {subtitle2}
        </div>
        <h6 className="">{subtitle3}</h6>
      </div>
    </div>
  );
};
export default Card;
