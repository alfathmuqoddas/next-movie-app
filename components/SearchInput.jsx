import SearchLogo from "./SearchLogo";

export const SearchInput = ({
  onChange,
  onSubmit,
  searchValue,
  size = "sm",
}) => {
  return (
    <form className="form-control" onSubmit={onSubmit}>
      <label
        className={`input input-bordered input-${size} rounded-full flex gap-2 items-center`}
      >
        <input
          value={searchValue}
          onChange={onChange}
          type="text"
          placeholder="Search"
          className="grow"
        />
        <SearchLogo size={"16"} />
      </label>
    </form>
  );
};
