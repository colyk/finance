import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currencyIntl, formatDate, nowMoment } from '../utils';

export default function ExpensesBarChart(props) {
  let data = [];
  for (let i = 1; i <= nowMoment.daysInMonth(); i++) {
    data.push({ day: i, amount: null, title: null, categories: [], date: null });
  }

  props.transactions.forEach(transaction => {
    let amount = data[transaction.day - 1].amount + transaction.amount;
    data.splice(transaction.day - 1, 1, {
      day: transaction.day,
      amount: amount,
      title: transaction.title,
      categories: transaction.categories,
      date: transaction.createdAt,
    });
  });

  const amountWithCurrency = amount => currencyIntl.format(amount);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" fontSize={10} />
        <YAxis tickFormatter={amountWithCurrency} fontSize={10} />
        <Tooltip content={<CustomTooltip data={data} />} />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  const amountWithCurrency = amount => currencyIntl.format(amount);

  return active && payload.length ? (
    <div className="custom-tooltip">
      <div>{payload[0].payload.title}</div>
      <div>
        {formatDate(payload[0].payload.date, 'DD.MM.YYYY')} (
        {formatDate(payload[0].payload.date, 'dddd')})
      </div>
      <div>{amountWithCurrency(payload[0].value)}</div>
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
