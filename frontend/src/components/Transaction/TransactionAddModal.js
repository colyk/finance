import React, { useState } from 'react';
import { connect } from 'react-redux';
import requests from '../../requests';
import moment from 'moment';

import { toggleAddTransactionModal, fetchTransactions } from '../store/actions/actionTransaction';
import SingleDatePicker from '../DatePickers/SingleDatePicker';

function TransactionAddModal({ showAddTransactionModal, transactionsCountPerPage, currentPage, categories, fetchTransactions, toggleAddTransactionModal }) {
  const [loading, toggleLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(moment());
  const [day, setDay] = useState(moment()._d.getDate());
  const [month, setMonth] = useState(moment()._d.getMonth());
  const [year, setYear] = useState(moment()._d.getFullYear());
  const [monthDay, setMonthDay] = useState(moment()._d.getDay());

  const handleDatesChange = date => {
    setDate(date.target.value);
    setDay(date.target.value._d.getDate());
    setMonth(date.target.value._d.getMonth());
    setYear(date.target.value._d.getFullYear());
    setMonthDay(date.target.value._d.getDay());
  }

  const closeModal = () => {
    setTitle('');
    setAmount('');
    setCategory('');
    toggleLoading(false);
    toggleAddTransactionModal(false);
  };

  const createTransaction = () => {
    toggleLoading(true);
    requests
      .post('/transaction', { title, amount, category, day, month, year, monthDay })
      .then(res => {
        fetchTransactions(currentPage, transactionsCountPerPage);
        closeModal();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => toggleLoading(false));
  }

  return (
    <div className={`modal ${showAddTransactionModal ? 'active' : ''}`} id="modal-transaction">
      <div className="modal-overlay" aria-label="Close" onClick={closeModal}></div>
      <div className={`modal-container ${loading ? 'loading' : ''}`}>
        <div className="modal-header">
          <button className="btn btn-clear float-right" aria-label="Close" onClick={closeModal}></button>
          <div className="modal-title h5">Transaction creating</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className="form-group">
              <label className="form-label" htmlFor="input-title">Title</label>
              <input
                className="form-input"
                value={title}
                name="title"
                type="text"
                id="input-title"
                placeholder="title"
                onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-amount">Amount</label>
              <input
                className="form-input"
                value={amount}
                name="amount"
                type="text"
                id="input-amount"
                placeholder="0.00"
                onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-date">Date</label>
              <SingleDatePicker
                date={date}
                onChange={handleDatesChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="select-category">Categories</label>
              <select
                className="form-select"
                id="select-category"
                onChange={e => setCategory(e.target.value)}>
                <option value="" >Choose a category</option>
                {categories ?
                  categories.map(({ _id, type }) => (
                    <option value={type} key={_id}>{type}</option>)
                  )
                  : null
                }
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn mr-2" onClick={closeModal}>
            Close
            </button>
          <button className="btn btn-primary" onClick={createTransaction}>
            Create transaction
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.rootReducer.categories,
    showAddTransactionModal: state.transactionReducer.showAddTransactionModal,
    transactionsCountPerPage: state.transactionReducer.transactionsCountPerPage,
    currentPage: state.transactionReducer.currentPage
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddTransactionModal: visible => dispatch(toggleAddTransactionModal(visible)),
    fetchTransactions: (currentPage, transactionsCountPerPage) => dispatch(fetchTransactions(currentPage, transactionsCountPerPage))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAddModal);