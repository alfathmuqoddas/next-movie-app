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
          />
        </figure>
        <div className="">
          <h5 className="text-lg font-semibold">{title}</h5>
          <p className="p-0">{year}</p>
          <p className="p-0">{rating}</p>
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
      <figure className="flex-none w-20">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${img}`}
          alt="cardSmall-thumbnail"
          width={185}
          height={278}
          quality={75}
        />
      </figure>
      <div className="shrink">
        <h5 className="font-semibold text-xl">{title}</h5>
        <h6 className="text-xl">{subtitle}</h6>
        <h6 className="">{subtitle2}</h6>
        <h6 className="">{subtitle3}</h6>
      </div>
    </div>
  );
};
export default Card;
