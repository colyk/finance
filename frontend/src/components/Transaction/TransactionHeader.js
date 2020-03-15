import React from 'react'

const TransactionHeader = props => {

  const setCountPerPage = count => props.onSetCountPerPage(props.currentPage, count, props.dateRange);
  const transactionsPerPage = [5, 10, 15, 20, 25];

  return (
    <div className="header-transaction">
      <button
        className="btn btn-action s-circle tooltip tooltip-left"
        data-tooltip="Add transaction"
        onClick={props.onShowTransactionAddModalClick}>
        <i className="icon icon-plus"></i>
      </button>
      <div className="transaction-select">
        <select
          className="form-select"
          data-tooltip="Transations per page"
          id="select-page-count"
          onChange={e => setCountPerPage(e.target.value)}
          value={props.transactionsCountPerPage}>
          {
            transactionsPerPage.map(i => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default TransactionHeader;
