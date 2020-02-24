import React from 'react'

const TransactionHeader = props => {

  const setCountPerPage = count => props.onSetCountPerPage(props.currentPage, count);

  const range = [];
  for (let i = 5; i <= 25; i += 5) {
    range.push(i);
  }

  return (
    <div className="header-transaction">
      <h3>Transactions</h3>
      <div className="transaction-select">
        <button
          className="btn btn-action s-circle tooltip tooltip-left"
          data-tooltip="Add transaction"
          onClick={props.onShowTransactionAddModalClick}>
          <i className="icon icon-plus"></i>
        </button>
        <select
          className="form-select"
          id="select-page-count"
          onChange={e => setCountPerPage(e.target.value)}
          value={props.transactionsCountPerPage}>
          {
            range.map(i => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default TransactionHeader;
