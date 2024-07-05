import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchLogo from "./SearchLogo";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const searchMovies = async (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <div className="navbar w-full mx-auto px-8 bg-gradient-to-b from-base-100 from-70% to-transparent">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 drop-shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/trending">Trending</Link>
            </li>
            <li>
              <Link href="/popular">Popular Movies</Link>
            </li>
            <li>
              <Link href="/popular-tv">Popular TV</Link>
            </li>
            <li>
              <Link href="/now-playing">Now Playing</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost normal-case text-xl font-black" href="/">
          ALEFAST
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <SearchLogo />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-1 p-1 drop-shadow-lg bg-base-100 rounded-box w-auto"
          >
            <li>
              <form className="form-control p-1" onSubmit={searchMovies}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="input input-bordered"
                />
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
