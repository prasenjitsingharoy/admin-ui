import React from "react";

function Pagination({ currentPage, totalPages, changePage, dataLength }) {
  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
      <button
        className="page-btn"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => changePage(pageNum)}
            className={isActive ? "active" : "page-btn"}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className="page-btn"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages || dataLength === 0}
      >
        {">"}
      </button>
      <button
        className="page-btn"
        onClick={() => changePage(totalPages)}
        disabled={currentPage === totalPages || dataLength === 0}
      >
        {">>"}
      </button>
    </div>
  );
}

export default Pagination;
