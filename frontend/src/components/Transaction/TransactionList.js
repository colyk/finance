import React from 'react'

const TransactionList = props => {

  const onClick = (e, id) => {
    e.preventDefault();
    props.onRemoveClick(id);
  };

  return (
    props.transactions.map(({ _id, title, category, amount, year, month, day, monthDay }) =>
      <tr key={_id}>
        <td>{title}</td>
        <td className="category-transaction">{category}</td>
        <td>{amount}</td>
        <td>{day}.{month}.{year}</td>
        <td className="popover popover-left popover-transaction">
          <i className="icon icon-more-vert btn btn-link"></i>
          <div className="popover-container">
            <div className="card">
              <div className="card-header">
                {title} ({category})
                            </div>
              <div className="card-body">
                {amount} - {day}.{month}.{year}({monthDay})
                            </div>
              <div className="card-footer editing-transaction">
                <div>
                  <i className="icon icon-edit btn btn-primary"></i>
                </div>
                <div key={_id} onClick={e => onClick(e, _id)}>
                  <i className="icon icon-cross btn btn-error"></i>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>)
  );
};

export default TransactionList;
