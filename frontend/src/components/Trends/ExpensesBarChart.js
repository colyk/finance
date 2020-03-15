import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currencyIntl, formatDate, nowMoment, _moment } from '../utils';

export default function ExpensesBarChart(props) {
  let data = [];
  for (let i = 1; i <= props.chooseMonth.daysInMonth(); i++) {
    data.push({ day: i, amount: null, title: null, categories: [], date: null });
  }

  props.transactions.forEach(transaction => {
    let amount = data[transaction.day - 1].amount + transaction.amount;
    data.splice(transaction.day - 1, 1, {
      day: transaction.day,
      amount: amount,
      title: transaction.title,
      categories: transaction.categories,
      date: transaction.date,
    });
  });

  return (
    <div className="expenses-trend">
      <div className="monthly-expense-header">
        <h5>Monthly expense</h5>
        <div className="form-group">
          <select
            className="form-select"
            onChange={e =>
              props.setdateRange({
                from: _moment()
                  .startOf('month')
                  .set('month', e.target.value),
                to: _moment()
                  .endOf('month')
                  .set('month', e.target.value),
              })
            }
            defaultValue={nowMoment._d.getMonth()}
          >
            {nowMoment._locale._months.map((month, index) => (
              <option disabled={nowMoment._d.getMonth() < index} key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" fontSize={10} />
          <YAxis tickFormatter={currencyIntl} fontSize={10} />
          <Tooltip content={<CustomTooltip data={data} />} />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  return active && payload.length ? (
    <div className="custom-tooltip">
      <div>{payload[0].payload.title}</div>
      <div>
        {formatDate(payload[0].payload.date, 'DD.MM.YYYY')} (
        {formatDate(payload[0].payload.date, 'dddd')})
      </div>
      <div>{currencyIntl(payload[0].value)}</div>
      <div>
        {payload[0].payload.categories &&
          payload[0].payload.categories.map((category, index) => (
            <CategoryChip category={category} key={index} />
          ))}
      </div>
    </div>
  ) : null;
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
