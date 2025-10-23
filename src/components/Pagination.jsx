const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="join items-center justify-center w-full">
      <button
        className="join-item btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        previous
      </button>
      <button className="join-item btn" disabled>
        {page} of {totalPages}
      </button>
      <button
        className="join-item btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
