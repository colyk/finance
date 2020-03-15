import React from 'react';

const ListPagination = props => {
  if (props.transactionsCount <= props.transactionsCountPerPage) return null;

  let currentPage = parseInt(props.currentPage);
  const PageCount = Math.ceil(props.transactionsCount / props.transactionsCountPerPage);
  if(currentPage > PageCount) --currentPage;

  const range = [];
  for (let i = 1; i <= PageCount; i++) range.push(i);

  const onClickPage = page => props.onSetPage(page, props.transactionsCountPerPage, props.dateRange);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="btn"
            onClick={() => onClickPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {range.map((i, index) => (
          <li className="page-item" key={index}>
            <button
              className={currentPage === i ? 'btn btn-primary' : 'btn'}
              onClick={() => onClickPage(i)}
            >
              {i}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="btn"
            onClick={() => onClickPage(currentPage + 1)}
            disabled={currentPage === PageCount}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ListPagination;
