const RadialRating = ({ rating, size }) => {
  // Determine the color class based on the rating
  let textColorClass = "text-green-500"; // Default for ratings > 7
  if (rating <= 5) {
    textColorClass = "text-red-500";
  } else if (rating <= 7) {
    // This now covers ratings > 5 and <= 7
    textColorClass = "text-yellow-500";
  }

  return (
    <div
      className={`my-8 radial-progress bg-primary border-4 border-primary ${textColorClass}`}
      style={{
        "--value": rating * 10,
        "--size": size,
      }}
    >
      {Math.round(rating * 10)}
    </div>
  );
};

export default RadialRating;
