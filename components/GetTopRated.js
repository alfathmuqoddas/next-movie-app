import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "./Card";

function GetTopRated() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log(data);

  return (
    <div className="mb-2">
      <h3 className="text-2xl">Top Rated</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">
          {data.map((dat) => (
            <Card
              key={dat.id}
              img={"https://image.tmdb.org/t/p/w500" + dat.poster_path}
              title={dat.original_title}
              year={dat.release_date.substring(0, 4)}
              rating={dat.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetTopRated;
