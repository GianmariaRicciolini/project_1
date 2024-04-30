import React from "react";

const Pagination = ({ currentPage, lastPage, changePage }) => {
  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <span className="page-link text-success btn" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
            Previous
          </span>
        </li>

        {generatePaginationArray().map((page) => (
          <li key={page.n} className={`page-item ${page.active && "active"}`}>
            <span
              className={`page-link text-success btn ${page.active ? "bg-success text-white border-white" : ""}`}
              onClick={() => changePage(page.n)}
            >
              {page.n}
            </span>
          </li>
        ))}

        <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
          <span
            className="page-link text-success btn"
            onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
