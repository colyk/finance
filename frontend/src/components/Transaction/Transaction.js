import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchTransactions } from '../store/actions/actionTransaction';
import { fetchCategories } from '../store/actions/index';

import TransactionHeader from './TransactionHeader';
import TransactionsView from './TransactionsView';
import TransactionListPagination from './TransactionListPagination';
import TransactionAddModal from './TransactionAddModal';

import '../../styles/transaction.css';

function Transaction({ countPerPage, currentPage, dateRange, fetchTransactions, fetchCategories }) {
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, currentPage, countPerPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, currentPage, countPerPage, dateRange.from, dateRange.to]);

  return (
    <div>
      <TransactionHeader countPerPage={countPerPage} currentPage={currentPage} />
      <TransactionsView />
      <TransactionListPagination countPerPage={countPerPage} currentPage={currentPage} />
      <TransactionAddModal />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    countPerPage: state.transactionReducer.countPerPage,
    currentPage: state.transactionReducer.currentPage,
    dateRange: state.transactionReducer.dateRange,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
