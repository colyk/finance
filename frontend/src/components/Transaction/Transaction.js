import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { toggleAddTransactionModal, fetchTransactions } from '../store/actions/actionTransaction';
import { fetchCategories } from '../store/actions/index';

import TransactionHeader from './TransactionHeader';
import TransactionsView from './TransactionsView';
import TransactionListPagination from './TransactionListPagination';
import TransactionAddModal from './TransactionAddModal';

import '../../styles/transaction.css';

function Transaction({ transactionsCountPerPage, currentPage, transactionsCount, fetchTransactions, fetchCategories, toggleAddTransactionModal }) {

  useEffect(() => {
    fetchTransactions(currentPage, transactionsCountPerPage);
  }, [fetchTransactions, currentPage, transactionsCountPerPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onShowTransactionAddModalClick = () => {
    toggleAddTransactionModal(true);
  };

  return (
    <div>
      <TransactionHeader
        onShowTransactionAddModalClick={onShowTransactionAddModalClick}
        transactionsCountPerPage={transactionsCountPerPage}
        onSetCountPerPage={fetchTransactions}
        currentPage={currentPage} />
      <TransactionsView />
      <TransactionListPagination
        transactionsCount={transactionsCount}
        transactionsCountPerPage={transactionsCountPerPage}
        onSetPage={fetchTransactions}
        currentPage={currentPage} />
      <TransactionAddModal />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showAddTransactionModal: state.transactionReducer.showAddTransactionModal,
    transactions: state.transactionReducer.transactions,
    transactionsCountPerPage: state.transactionReducer.transactionsCountPerPage,
    transactionsCount: state.transactionReducer.transactionsCount,
    currentPage: state.transactionReducer.currentPage
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddTransactionModal: visible => dispatch(toggleAddTransactionModal(visible)),
    fetchTransactions: (currentPage, transactionsCountPerPage) => dispatch(fetchTransactions(currentPage, transactionsCountPerPage)),
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
