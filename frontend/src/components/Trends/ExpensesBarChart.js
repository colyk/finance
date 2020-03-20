import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CategoryChip from '../CategoryChip';
import { currencyIntl, formatDate, nowMoment, _moment, getRandomColor } from '../utils';

export default function ExpensesBarChart(props) {
  let bars = ['amount1'];
  let data = [];

  for (let i = 1; i <= props.chooseMonth.daysInMonth(); i++) {
    data.push({ day: i, amount1: null, date: null });
  }

  props.transactions.forEach(transaction => {
    let day = parseInt(formatDate(transaction.date, 'DD'));
    let bar = data[day - 1] || { day };
    let barLength = bars.length + 1;
    let amountItem = bars[barLength - 2];

    if (data[day - 1].amount1) {
      amountItem = amountItem.substring(0, amountItem.length - 1) + barLength;
      bars.push(amountItem);
    }

    bar[amountItem] = transaction.amount;
    bar['date'] = transaction.date;
    data[day - 1] = bar;
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
          <Tooltip
            content={<CustomTooltip data={data} bars={bars} transactions={props.transactions} />}
          />
          {bars.map((bar, idx) => (
            <Bar dataKey={bar} stackId="a" fill={getRandomColor()} key={idx} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, transactions }) => {
  let items = null;

  if (payload[0]) {
    items = transactions.filter(
      transaction =>
        parseInt(formatDate(transaction.date, 'DD')) ===
        parseInt(formatDate(payload[0].payload.date, 'DD'))
    );
  }

  return active && payload.length ? (
    <div className="custom-tooltip">
      <div>
        {formatDate(payload[0].payload.date, 'DD.MM.YYYY')}(
        {formatDate(payload[0].payload.date, 'dddd')})
      </div>
      {items.map(({ _id, title, amount, categories }) => (
        <div key={_id}>
          <div>
            {title} - {currencyIntl(amount)}
          </div>
          {categories.map((category, index) => (
            <CategoryChip id={category._id} key={index} />
          ))}
        </div>
      ))}
    </div>
  ) : null;
};
