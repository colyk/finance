import React from 'react';
import { Redirect, Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

const BudgetsTab = ({ budgets }) => {
  return (
    <ul className="tab">
      {budgets ? (
        budgets.map(({ name }, idx) => <MenuLink label={name} to={name} idx={idx} key={name} />)
      ) : (
        <EmptyBudgetsTab />
      )}
    </ul>
  );
};

const EmptyBudgetsTab = () => {
  return (
    <li className={`tab-item`}>
      <span className="active disabled">
        Create your first budget <i className="icon icon-forward"></i>
      </span>
    </li>
  );
};

const MenuLink = ({ label, to, idx }) => {
  to = `/${to}`;
  let match = useRouteMatch({ path: to });
  return (
    <li className={`tab-item ${match ? 'active' : ''}`}>
      {idx === 0 ? <Redirect to={to} /> : ''}
      <Link className="btn btn-link" to={to}>
        {label}
      </Link>
    </li>
  );
};

const mapStateToProps = state => {
  return { budgets: state.rootReducer.budgets };
};

export default connect(mapStateToProps)(BudgetsTab);
