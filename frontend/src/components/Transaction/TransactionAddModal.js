import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import requests from '../../requests';

import {
  toggleAddTransactionModal,
  fetchTransactions,
  resetUpdateTransactions,
} from '../store/actions/actionTransaction';
import SingleDatePicker from '../DatePickers/SingleDatePicker';
import CategoryChip from '../CategoryChip';
import { nowMoment, formatMoment } from '../utils';

function TransactionAddModal({
  showAddTransactionModal,
  categories,
  fetchTransactions,
  toggleAddTransactionModal,
  editingTransaction,
  resetUpdateTransactions,
  onTransactionPost,
}) {
  const [loading, toggleLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [date, setDate] = useState(nowMoment);
  const [type, setType] = useState('expense');

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setSelectedCategories(editingTransaction.categories);
      setDate(formatMoment(editingTransaction.date));
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  const closeModal = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setSelectedCategories([]);
    setDate(nowMoment);
    toggleLoading(false);
    if (editingTransaction) resetUpdateTransactions();
    toggleAddTransactionModal(false);
  };

  const createTransaction = () => {
    toggleLoading(true);
    const data = {
      categories: selectedCategories,
      title,
      amount,
      date,
      type,
    };
    if (onTransactionPost) onTransactionPost(data);
    requests
      .post('/transaction', data)
      .then(res => {
        fetchTransactions();
        closeModal(res);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => toggleLoading(false));
  };

  const updateTransaction = () => {
    toggleLoading(true);

    const id = editingTransaction._id;

    requests
      .put('/transaction', {
        id,
        title,
        amount,
        categories: selectedCategories,
        date,
        type,
      })
      .then(res => {
        fetchTransactions();
        closeModal();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => toggleLoading(false));
  };

  const onCategorySelect = e => {
    const type = e.target.value;
    if (!type) return;

    const category = categories.find(category => category.type === type);
    setSelectedCategories([...selectedCategories, { _id: category._id }]);
    Array.from(e.target.options).map(el => (el.selected = false));
  };

  const deleteCategory = index => {
    setSelectedCategories(selectedCategories.filter((_, idx) => idx !== index));
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
          <div className="modal-title h5">
            {editingTransaction ? 'Transaction editing' : 'Transaction creating'}
          </div>
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
              <SingleDatePicker date={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="select-category">
                Categories:
                {selectedCategories.length > 0 &&
                  selectedCategories.map((category, index) => (
                    <CategoryChip
                      id={category._id}
                      key={index}
                      onButtonClick={() => deleteCategory(index)}
                    />
                  ))}
              </label>
              <select
                className="form-select"
                id="select-category"
                onChange={e => onCategorySelect(e)}
                disabled={selectedCategories.length >= 3}
              >
                <option value="">Choose a category</option>

                {categories.map((category, index) => (
                  <option
                    value={category.type}
                    disabled={selectedCategories.includes(category)}
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
          {editingTransaction ? (
            <button className="btn btn-primary" onClick={updateTransaction}>
              Edit transaction
            </button>
          ) : (
            <button className="btn btn-primary" onClick={createTransaction}>
              Create transaction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.rootReducer.categories,
    showAddTransactionModal: state.transactionReducer.showAddTransactionModal,
    editingTransaction: state.transactionReducer.editingTransaction,
    dateRange: state.transactionReducer.dateRange,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddTransactionModal: visible => dispatch(toggleAddTransactionModal(visible)),

    fetchTransactions: () => dispatch(fetchTransactions()),
    resetUpdateTransactions: () => dispatch(resetUpdateTransactions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAddModal);
