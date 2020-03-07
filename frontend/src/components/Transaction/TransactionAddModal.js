import React, { useState } from 'react';
import { connect } from 'react-redux';
import requests from '../../requests';

import { toggleAddTransactionModal, fetchTransactions } from '../store/actions/actionTransaction';
import SingleDatePicker from '../DatePickers/SingleDatePicker';
import { nowMoment } from '../utils';

function TransactionAddModal({
  showAddTransactionModal,
  transactionsCountPerPage,
  currentPage,
  categories,
  fetchTransactions,
  toggleAddTransactionModal,
}) {
  const [loading, toggleLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryCount, setSelectedCategoryCount] = useState(0);
  const [date, setDate] = useState(nowMoment);
  const [day, setDay] = useState(nowMoment._d.getDate());
  const [month, setMonth] = useState(nowMoment._d.getMonth());
  const [year, setYear] = useState(nowMoment._d.getFullYear());
  const [monthDay, setMonthDay] = useState(nowMoment._d.getDay());
  const [type, setType] = useState('expense');

  const handleDatesChange = date => {
    setDate(date.target.value);
    setDay(date.target.value._d.getDate());
    setMonth(date.target.value._d.getMonth());
    setYear(date.target.value._d.getFullYear());
    setMonthDay(date.target.value._d.getDay());
  };

  const closeModal = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setSelectedCategories([]);
    setSelectedCategoryCount(0);
    toggleLoading(false);
    toggleAddTransactionModal(false);
  };

  const createTransaction = () => {
    toggleLoading(true);
    requests
      .post('/transaction', {
        title,
        amount,
        selectedCategories,
        date,
        day,
        month,
        year,
        monthDay,
        type,
      })
      .then(res => {
        fetchTransactions(currentPage, transactionsCountPerPage);
        closeModal();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => toggleLoading(false));
  };

  const onCategorySelect = (type, categories) => {
    if (!type) return;
    let item = categories.find(category => category.type === type);
    let category = { type: type, background: item.background, color: item.color };
    selectedCategories.push(category);
    setSelectedCategories(selectedCategories);
    setSelectedCategoryCount(selectedCategoryCount + 1);
  };

  const deleteCategory = index => {
    selectedCategories.splice(index, 1);
    setSelectedCategoryCount(selectedCategoryCount - 1);
  };

  return (
    <div className={`modal ${showAddTransactionModal ? 'active' : ''}`} id="modal-transaction">
      <div className="modal-overlay" aria-label="Close" onClick={closeModal}></div>
      <div className={`modal-container ${loading ? 'loading' : ''}`}>
        <div className="modal-header">
          <button
            className="btn btn-clear float-right"
            aria-label="Close"
            onClick={closeModal}
          ></button>
          <div className="modal-title h5">Transaction creating</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className="form-group">
              <label className="form-label" htmlFor="input-title">
                Title
              </label>
              <input
                className="form-input"
                value={title}
                name="title"
                type="text"
                id="input-title"
                placeholder="title"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-amount">
                Amount
              </label>
              <input
                className="form-input"
                value={amount}
                name="amount"
                type="text"
                id="input-amount"
                placeholder="0.00"
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-date">
                Date
              </label>
              <SingleDatePicker date={date} onChange={handleDatesChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="select-category">
                Categories
                {selectedCategories.length > 0 &&
                  selectedCategories.map((category, index) => (
                    <div
                      className="chip"
                      style={{ backgroundColor: category.background, color: category.color }}
                      key={index}
                    >
                      {category.type}
                      <button
                        className="btn btn-clear"
                        aria-label="Close"
                        onClick={() => deleteCategory(index)}
                      ></button>
                    </div>
                  ))}
              </label>
              <select
                className="form-select"
                id="select-category"
                onChange={e => onCategorySelect(e.target.value, categories)}
                disabled={selectedCategories.length >= 3}
              >
                <option value="">Choose a category</option>
                {categories &&
                  categories.map((category, index) => (
                    <option
                      value={category.type}
                      style={{ backgroundColor: category.background, color: category.color }}
                      key={index}
                    >
                      {category.type}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-radio form-inline">
                <input
                  type="radio"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                />
                <i className="form-icon"></i> Expense
              </label>
              <label className="form-radio form-inline">
                <input
                  type="radio"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                />
                <i className="form-icon"></i> Income
              </label>
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

const mapStateToProps = state => {
  return {
    categories: state.rootReducer.categories,
    showAddTransactionModal: state.transactionReducer.showAddTransactionModal,
    transactionsCountPerPage: state.transactionReducer.transactionsCountPerPage,
    currentPage: state.transactionReducer.currentPage,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddTransactionModal: visible => dispatch(toggleAddTransactionModal(visible)),
    fetchTransactions: (currentPage, transactionsCountPerPage) =>
      dispatch(fetchTransactions(currentPage, transactionsCountPerPage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAddModal);
