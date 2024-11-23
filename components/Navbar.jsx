import Link from "next/link";

import { SearchInput } from "./SearchInput";
import AuthButton from "./AuthButton";
import { SearchInputButton } from "./SearchInputButton";

const Navbar = () => {
  return (
    <div className="navbar w-full mx-auto bg-gradient-to-b from-base-100 from-70% to-transparent">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-md rounded-full">
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
            className="menu menu-compact dropdown-content mt-3 p-2 drop-shadow-lg bg-base-100 rounded-2xl w-52"
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
        <Link
          className="btn btn-ghost rounded-full normal-case text-xl font-black"
          href="/"
        >
          ALEFAST
        </Link>
      </div>
      <div className="navbar-end">
        <div className="hidden xl:block">
          <SearchInput />
        </div>
        <SearchInputButton />
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
