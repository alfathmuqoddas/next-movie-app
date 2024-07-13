import SearchLogo from "./SearchLogo";

export const SearchInput = ({ onChange, onSubmit, searchValue, small }) => {
  return (
    <form className="form-control" onSubmit={onSubmit}>
      <label
        className={`input input-bordered ${
          small ? "input-sm" : "input-md"
        } rounded-full flex gap-2 items-center`}
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
