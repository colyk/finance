import React, { useState } from 'react';
import requests from '../../requests';
import DateRangePicker from '../DatePickers/DateRangePicker';

export function BudgetAddModal({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState(null);
  const [active, toggleModal] = useState(true);
  const [loading, toggleLoading] = useState(false);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onCreateClick = e => {
    toggleLoading(true);
    requests
      .post('budgets', { from: startDate, to: endDate, amount, name })
      .then(res => {
        toggleLoading(false);
        onClose(true);
        toggleModal(false);
      })
      .catch(e => {
        console.log(e);
        toggleLoading(false);
      });
  };

  return (
    <div className={`modal ${active ? 'active' : ''}`}>
      <div
        className="modal-overlay"
        onClick={() => {
          toggleModal(false);
          onClose();
        }}
      />
      <div className="modal-container" role="document">
        <div className="modal-header">
          <div className="modal-title h5">Budget creating form</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="budget-modal__name">
                  Budget name
                </label>
                <input
                  className="form-input"
                  id="budget-modal__name"
                  type="text"
                  placeholder="Year budget"
                  onChange={e => setName(e.target.value)}
                />
                <label className="form-label" htmlFor="budget-modal__date-range">
                  Date range
                </label>
                <div id="budget-modal__date-range">
                  <DateRangePicker onChange={handleDatesChange} />
                </div>
                <label className="form-label" htmlFor="budget-modal__amount">
                  Goal budget amount
                </label>
                <input
                  className="form-input"
                  id="budget-modal__amount"
                  type="text"
                  placeholder="0.00"
                  onChange={e => setAmount(e.target.value.replace(/\s/g, '').replace(/,/, '.'))}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn mr-2"
            onClick={() => {
              toggleModal(false);
              onClose();
            }}
          >
            Close
          </button>
          <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={onCreateClick}>
            Create budget
          </button>
        </div>
      </div>
    </div>
  );
}
