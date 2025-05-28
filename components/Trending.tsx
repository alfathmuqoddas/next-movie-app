"use client";
import RadioButtonGroup from "./RadioButtonGroup";
import { TemplateFront2 } from "./TemplateFront";
import { useState } from "react";

export default function Trending({ trendingDatasDay, trendingDatasWeek }) {
  const [trendingTime, setTrendingTime] = useState("day");
  const trendingOptions = [
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
  ];
  const handleTrendingChange = (e: any) => {
    setTrendingTime(e.target.value);
  };

  return (
    <section aria-label="trending">
      <div className="flex gap-4 px-4 md:px-8">
        <h1 className="text-2xl font-black">TRENDING</h1>
        <div className="flex border rounded-full">
          <RadioButtonGroup
            contents={trendingOptions}
            checkedFunction={trendingTime}
            onChange={handleTrendingChange}
          />
        </div>
      </div>
      {trendingTime === "day" ? (
        <TemplateFront2 content={trendingDatasDay} contentLink="" />
      ) : trendingTime === "week" ? (
        <TemplateFront2 content={trendingDatasWeek} contentLink="" />
      ) : (
        <></>
      )}
    </section>
  );
}
