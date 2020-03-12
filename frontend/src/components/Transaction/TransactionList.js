import React from 'react';
import { currencyIntl, formatDate } from '../utils';

const TransactionList = props => {
  return props.transactions.map(({ _id, title, categories, amount, type, date }) => (
    <tr
      key={_id}
      className={type === 'expense' ? 'expense-border' : type === 'income' ? 'income-border' : null}
    >
      <td>{title}</td>
      <td className="hide-sm">
        {categories &&
          categories.map((category, index) => <CategoryChip category={category} key={index} />)}
      </td>
      <td>{currencyIntl(amount)}</td>
      <td>{formatDate(date, 'DD.MM.YYYY')}</td>
      <td className="popover popover-left popover-transaction">
        <i className="icon icon-more-vert btn btn-link"></i>
        <div className="popover-container">
          <div className="card">
            <div className="card-header">
              {title}
              {categories &&
                categories.map((category, index) => (
                  <CategoryChip category={category} key={index} />
                ))}
            </div>
            <div className="card-body">
              {currencyIntl(amount)} - {formatDate(date, 'DD.MM.YYYY')} ({formatDate(date, 'dddd')})
            </div>
            <div className="card-footer editing-transaction">
              <div onClick={() => props.onEditClick(_id)}>
                <i className="icon icon-edit btn btn-primary"></i>
              </div>
              <div onClick={() => props.onRemoveClick(_id)}>
                <i className="icon icon-cross btn btn-error"></i>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  ));
};

const CategoryChip = ({ category }) => {
  const style = {
    backgroundColor: category.background,
    color: category.color,
  };

  return (
    <span className="chip" style={style}>
      {' '}
      {category.type}
    </span>
  );
};

export default TransactionList;
