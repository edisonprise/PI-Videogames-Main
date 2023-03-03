import React from "react";
import * as p from "./Pagination.module.css";

export default function Pagination({
  cardPerPage,
  totalCards,
  paginate,
  currentPage,
}) {
  if (Math.ceil(totalCards / cardPerPage) < currentPage) {
    paginate(1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={p.pagdiv}>
      <ul>
        {pageNumbers.length > 1 &&
          pageNumbers.map((p, i) =>
            p === currentPage ? (
              <li key={i}>
                <button className={p.pagbtn} onClick={() => paginate(p)}>
                  {p}
                </button>
              </li>
            ) : (
              <li key={i}>
                <button className={p.pagbtn} onClick={() => paginate(p)}>
                  {p}
                </button>
              </li>
              
            )
          )}
      </ul>
    </div>
  );
}
