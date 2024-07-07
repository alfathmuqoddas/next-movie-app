const RadialRating = ({ rating, size }) => {
  if (rating <= 5) {
    return (
      <div
        className="mt-2 radial-progress bg-primary text-red-500 border-4 border-primary"
        style={{
          "--value": rating * 10,
          "--size": size,
        }}
      >
        {Math.round(rating * 10)}
      </div>
    );
  } else if (rating > 5 && rating <= 7) {
    return (
      <div
        className="mt-2 radial-progress bg-primary text-yellow-500 border-4 border-primary"
        style={{
          "--value": rating * 10,
          "--size": size,
        }}
      >
        {Math.round(rating * 10)}
      </div>
    );
  } else {
    return (
      <div
        className="mt-2 radial-progress bg-primary text-green-500 border-4 border-primary"
        style={{
          "--value": rating * 10,
          "--size": size,
        }}
      >
        {Math.round(rating * 10)}
      </div>
    );
  }
};

export default RadialRating;
