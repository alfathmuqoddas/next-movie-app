import SearchLogo from "./SearchLogo";

export const SearchInputDesktop = ({ onChange, onSubmit, searchValue }) => {
  return (
    <form className="form-control my-2" onSubmit={onSubmit}>
      <label className="input input-bordered input-sm rounded-full flex gap-2 items-center">
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

export const SearchInputMobile = ({ onChange, onSubmit, searchValue }) => {
  return <div>SearchInput</div>;
};
