import { connect } from 'react-redux';
import React, { useState } from 'react';

import DateRangePicker from '../DatePickers/DateRangePicker';

import requests from '../../requests';
import { toggleAddBudgetModal } from '../store/actions/componentBudget';
import { fetchBudgets } from '../store/actions/index';

function BudgetAddModal({ showAddBudgetModal, fetchBudgets, toggleAddBudgetModal }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, toggleLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [amountError, setAmountError] = useState('');

  const validateFields = () => {
    let isCorrect = true;
    if (!name) {
      setNameError('Provide budget title');
      isCorrect = false;
    } else setNameError('');

    if (!startDate || !endDate) {
      setDateError('Provide date range');
      isCorrect = false;
    } else setDateError('');

    if (!amount) {
      setAmountError('Provide goal amount');
      isCorrect = false;
    } else setAmountError('');

    return isCorrect;
  };

  const closeModal = () => {
    toggleLoading(false);
    setName('');
    setStartDate(null);
    setEndDate(null);
    setAmount('');

    setAmountError('');
    setNameError('');
    setDateError('');

    toggleAddBudgetModal(false);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onCreateClick = e => {
    const isCorrect = validateFields();
    console.log(isCorrect);
    if (!isCorrect) return;

    toggleLoading(true);
    requests
      .post('/budget', { from: startDate, to: endDate, amount, name })
      .then(res => {
        fetchBudgets();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        closeModal();
      });
  };

  return (
    <div className={`modal ${showAddBudgetModal ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={closeModal} />
      <div className={`modal-container ${loading ? 'loading' : ''}`} role="document">
        <div className="modal-header">
          <div className="modal-title h5">Budget creating form</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <form>
              <div className={`form-group ${nameError ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="budget-modal__name">
                  Budget title
                </label>
                <input
                  className="form-input"
                  id="budget-modal__name"
                  type="text"
                  value={name}
                  placeholder="Year budget"
                  onChange={e => setName(e.target.value)}
                />
                <p class="form-input-hint">{nameError}</p>
              </div>

              <div className={`form-group ${dateError ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="budget-modal__date-range">
                  Date range
                </label>
                <div id="budget-modal__date-range">
                  <DateRangePicker from={startDate} to={endDate} onChange={handleDatesChange} />
                </div>
                <p class="form-input-hint">{dateError}</p>
              </div>

              <div className={`form-group ${amountError ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="budget-modal__amount">
                  Goal budget amount
                </label>
                <input
                  className="form-input"
                  id="budget-modal__amount"
                  type="text"
                  value={amount}
                  placeholder="0.00"
                  onChange={e => setAmount(e.target.value.replace(/\s/g, '').replace(/,/, '.'))}
                />
                <p class="form-input-hint">{amountError}</p>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn mr-2" onClick={closeModal}>
            Close
          </button>
          <button className={`btn btn-primary`} onClick={onCreateClick}>
            Create budget
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { showAddBudgetModal: state.cBudgetReducer.showAddBudgetModal };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddBudgetModal: visible => dispatch(toggleAddBudgetModal(visible)),
    fetchBudgets: () => dispatch(fetchBudgets()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetAddModal);
