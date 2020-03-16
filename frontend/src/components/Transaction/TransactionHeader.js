import React from 'react';
import { connect } from 'react-redux';
import { toggleAddTransactionModal, setPaginationMeta } from '../store/actions/actionTransaction';

const TransactionHeader = props => {
  const transactionsPerPage = [5, 10, 15, 20, 25];

  return (
    <div className="header-transaction">
      <button
        className="btn btn-action s-circle tooltip tooltip-left"
        data-tooltip="Add transaction"
        onClick={props.showAddTransactionModal}
      >
        <i className="icon icon-plus"></i>
      </button>
      <div className="transaction-select">
        <select
          className="form-select"
          data-tooltip="Transactions per page"
          id="select-page-count"
          onChange={e => props.setCountPerPage(parseInt(e.target.value))}
          value={props.countPerPage}
        >
          {transactionsPerPage.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    showAddTransactionModal: () => dispatch(toggleAddTransactionModal(true)),
    setCountPerPage: countPerPage => dispatch(setPaginationMeta({ countPerPage })),
  };
}

export default connect(null, mapDispatchToProps)(TransactionHeader);
