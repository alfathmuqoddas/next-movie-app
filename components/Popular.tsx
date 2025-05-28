"use client";
import RadioButtonGroup from "./RadioButtonGroup";
import { TemplateFront2 } from "./TemplateFront";
import { useState } from "react";

export default function Popular({ popularDatas, popularTvDatas }) {
  const [popularType, setPopularType] = useState("movie");
  const popularRadio = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];
  const handlePopularChange = (e) => {
    setPopularType(e.target.value);
  };

  return (
    <section aria-label="popular">
      <div className="flex gap-4 px-4 md:px-8">
        <h1 className="text-2xl font-black">POPULAR</h1>
        <div className="flex border rounded-full">
          <RadioButtonGroup
            contents={popularRadio}
            onChange={handlePopularChange}
            checkedFunction={popularType}
          />
        </div>
      </div>

      {popularType === "movie" ? (
        <TemplateFront2 content={popularDatas} contentLink="/movie" />
      ) : (
        <TemplateFront2 content={popularTvDatas} contentLink="/tv" />
      )}
    </section>
  );
}
