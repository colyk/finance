import React from 'react';

const ListPagination = props => {

  if (props.transactionsCount <= props.transactionsCountPerPage) {
    return null;
  }

  const currentPage = parseInt(props.currentPage);
  const PageCount = Math.ceil(props.transactionsCount / props.transactionsCountPerPage);

  const range = [];
  for (let i = 1; i <= PageCount; i++) {
    range.push(i);
  }

  const onClickPage = (e, page) => {
    e.preventDefault();
    props.onSetPage(page, props.transactionsCountPerPage);
  };

  return (
    <nav>
      <ul className="pagination">
        {currentPage === 1 ? null : (<li
          className="page-item"
          onClick={e => onClickPage(e, currentPage - 1)}>
          <a className="page-link" href='/#'>Previous</a>
        </li>)}
        {
          range.map((i) =>
            <li
              className={i === currentPage ? 'page-item active' : 'page-item'}
              onClick={e => onClickPage(e, i)}
              key={i.toString()}>
              <a className="page-link" href='/#'>{i}</a>
            </li>
          )
        }
        {currentPage === PageCount ? null : (<li
          className="page-item"
          onClick={e => onClickPage(e, currentPage + 1)}>
          <a className="page-link" href='/#'>Next</a>
        </li>)}
      </ul>
    </nav>
  );
};

export default ListPagination;
