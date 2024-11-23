"use client";
import { useState, useEffect, useRef } from "react";
import SearchLogo from "./SearchLogo";
import SearchInput from "./SearchInput";

export const SearchInputButton = () => {
  // console.log({ userData });
  const [isVisible, setIsVisible] = useState(false);
  const searchFormRef = useRef(null);
  const searchInputRef = useRef(null);

  const toggleSearchForm = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="block xl:hidden" ref={searchFormRef}>
      <div className="p-2" onClick={toggleSearchForm}>
        <SearchLogo size={"24"} />
      </div>
      {isVisible ? (
        <div className="py-4 px-6 bg-black absolute top-[46px] left-0 w-screen z-50 mx-auto">
          <SearchInput ref={searchInputRef} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
