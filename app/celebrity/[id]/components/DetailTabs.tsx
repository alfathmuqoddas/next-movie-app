"use client";
import { useState } from "react";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import TableData from "@/components/TableData";

export default function DetailTabs({ biography, movies, tvShows }) {
  const [tab, setTab] = useState("biography");
  const tabs = [
    { value: "biography", label: "Bioraphy" },
    { value: "movies", label: "Movies" },
    { value: "tvShows", label: "TV Shows" },
  ];
  const handleTrendingChange = (e: any) => {
    setTab(e.target.value);
  };

  return (
    <>
      <div className="flex justify-start mt-8">
        <nav
          className="flex border border-neutral-500 rounded-full"
          aria-label="Content tabs"
        >
          <RadioButtonGroup
            contents={tabs}
            checkedFunction={tab}
            onChange={handleTrendingChange}
          />
        </nav>
      </div>

      <div className="mt-4">
        {tab === "biography" ? (
          <article className="prose prose-neutral">{biography}</article>
        ) : tab === "movies" ? (
          <TableData data={movies} isMovie />
        ) : tab === "tvShows" ? (
          <TableData data={tvShows} isMovie={false} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
