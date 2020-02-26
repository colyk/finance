import React from 'react';

const TransactionList = props => {
  const onClick = (e, id) => {
    e.preventDefault();
    props.onRemoveClick(id);
  };

  return props.transactions.map(
    ({ _id, title, categories, amount, year, month, day, monthDay }) => (
      <tr key={_id}>
        <td>{title}</td>
        <td className="category-transaction">
          {categories.map((category, index) => (
            <CategoryChip category={category} key={index} />
          ))}
        </td>
        <td>{amount}</td>
        <td>
          {day}.{month}.{year}
        </td>
        <td className="popover popover-left popover-transaction">
          <i className="icon icon-more-vert btn btn-link"></i>
          <div className="popover-container">
            <div className="card">
              <div className="card-header">
                {title}
                {categories.map((category, index) => (
                  <CategoryChip category={category} key={index} />
                ))}
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
      </tr>
    )
  );
};

const CategoryChip = ({ category }) => {
  const style = {
    backgroundColor: category.background,
    color: category.color,
  };

  return (
    <span className="chip" style={style}>
      {category.type}
    </span>
  );
};

export default TransactionList;
