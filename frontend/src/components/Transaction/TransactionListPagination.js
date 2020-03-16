import React from 'react';
import { connect } from 'react-redux';
import { setPaginationMeta } from '../store/actions/actionTransaction';

const ListPagination = ({ currentPage, countPerPage, allTransactionsCount, setCurrentPage }) => {
  if (allTransactionsCount <= countPerPage) return null;

  const PageCount = Math.ceil(allTransactionsCount / countPerPage);
  if (currentPage > PageCount) --currentPage;

  const range = [];
  for (let i = 1; i <= PageCount; i++) range.push(i);

  const onClickPage = page => {
    setCurrentPage(page);
  };

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

const mapStateToProps = state => {
  return {
    allTransactionsCount: state.transactionReducer.allTransactionsCount,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: currentPage => dispatch(setPaginationMeta({ currentPage })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPagination);
