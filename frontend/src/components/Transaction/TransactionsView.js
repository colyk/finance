import React, { useState } from 'react';
import { connect } from 'react-redux';
import requests from '../../requests';
import { formatDate } from '../utils';

import TransactionList from './TransactionList';
import {
  fetchTransactions,
  toggleAddTransactionModal,
  updateTransactions,
} from '../store/actions/actionTransaction';
import DateRangePicker from '../DatePickers/DateRangePicker';

const TransactionsView = ({
  transactions,
  transactionsCountPerPage,
  currentPage,
  fetchTransactions,
  toggleAddTransactionModal,
  updateTransactions,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const cleaningDatesChange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const onEditClick = id => {
    toggleAddTransactionModal(true);
    updateTransactions(transactions.find(transaction => transaction._id === id));
  };

  const deleteTransaction = id => {
    requests
      .delete('/transaction', { params: { _id: id } })
      .then(res => {
        fetchTransactions(currentPage, transactionsCountPerPage);
      })
      .catch(e => {
        console.log(e);
      })
      .finally();
  };

  return (
    <div className="table-transactions">
      {transactions ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr className="active">
              <th>Title</th>
              <th className="hide-sm">Categories</th>
              <th>Amount</th>
              <th>
                <div className="date-transaction">
                  Date
                  <div className={startDate && endDate ? 'view-date' : ''}>
                    {startDate ? '[' + formatDate(startDate, 'DD.MM.YYYY') : ''}
                    {endDate ? '-' + formatDate(endDate, 'DD.MM.YYYY') + ']' : ''}
                  </div>
                  <div className="popover popover-left popover-date">
                    <i className="icon icon-edit btn btn-link"></i>
                    <div className="popover-container">
                      <div className="card">
                        <div className="card-header">
                          Choose date
                          <i
                            className="icon icon-cross btn btn-error clear-date"
                            onClick={cleaningDatesChange}
                          ></i>
                        </div>
                        <div className="card-body">
                          <DateRangePicker
                            from={startDate}
                            to={endDate}
                            onChange={handleDatesChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th className="popover-transaction"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ? (
              <TransactionList
                transactions={transactions}
                onRemoveClick={deleteTransaction}
                onEditClick={onEditClick}
              />
            ) : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactionReducer.transactions,
    transactionsCountPerPage: state.transactionReducer.transactionsCountPerPage,
    currentPage: state.transactionReducer.currentPage,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: (currentPage, transactionsCountPerPage) =>
      dispatch(fetchTransactions(currentPage, transactionsCountPerPage)),
    toggleAddTransactionModal: visible => dispatch(toggleAddTransactionModal(visible)),
    updateTransactions: payload => dispatch(updateTransactions(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);
