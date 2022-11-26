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

export const CardSmall = ({ img, title, subtitle }) => {
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
        </div>
      </div>
    </div>
  );
};

export default Card;
