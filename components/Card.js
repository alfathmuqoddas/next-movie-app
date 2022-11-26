const Card = ({ img, title, year, rating }) => {
  return (
    <div className="">
      <div className="w-48 xl:w-64">
        <figure>
          <img src={img} alt="card-thumbnail" />
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

export default Card;
