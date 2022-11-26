import { useRouter } from "next/router";

const SearchResult = () => {
  const router = useRouter();
  const { string } = router.query;

  return <p>You looking For: {string}?</p>;
};

export default SearchResult;
