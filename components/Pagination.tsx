const Pagination = ({ totalPages = 1, updatePage, currentPage }) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className="btn btn-sm btn-outline"
        disabled={currentPage <= 1}
        onClick={() => updatePage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        className="btn btn-sm btn-outline"
        disabled={currentPage >= totalPages}
        onClick={() => updatePage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
