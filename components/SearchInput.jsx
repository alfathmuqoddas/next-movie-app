"use client";
import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import SearchLogo from "./SearchLogo";

export const SearchInput = forwardRef((props, ref) => {
  // console.log({ userData });
  const [search, setSearch] = useState("");

  const router = useRouter();

  const searchMovies = async (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <form className="form-control" onSubmit={searchMovies}>
      <label className="input input-bordered input-sm rounded-full flex gap-2 items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a movie or tv show"
          className="grow"
          ref={ref}
        />
        <SearchLogo size={"16"} />
      </label>
    </form>
  );
});
