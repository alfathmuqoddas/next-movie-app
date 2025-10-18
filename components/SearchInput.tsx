import { useState, forwardRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import SearchLogo from "./SearchLogo";

const SearchInput = forwardRef<HTMLInputElement, any>((_props, ref) => {
  // console.log({ userData });
  const [search, setSearch] = useState("");

  const router = useRouter();

  const searchMovies = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/movie/${search}`);
    setSearch("");
  };

  return (
    <form className="form-control" onSubmit={searchMovies}>
      <label className="input input-sm bg-neutral-900 hover:bg-neutral-800 rounded-full flex gap-2 items-center transition-colors duration-200 ease-in-out">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search here"
          className="grow "
          ref={ref}
        />
        <SearchLogo size={"16"} />
      </label>
    </form>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
