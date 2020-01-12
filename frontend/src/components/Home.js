import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import Calendar from './Calendar';
import Budget from './Budget';
import Trend from './Trend';
import Category from './Category';
import FinancialAnalysis from './FinancialAnalysis';

function Home() {
  if (!sessionStorage.logged) this.props.history.push('login');

  return (
    <Router>
      <Redirect to="/home/budget" />
      <div>
        <header className="navbar mb-1">
          <ul className="tab">
            <MenuLink to="/home/calendar" label="Calendar" />
            <MenuLink to="/home/budget" label="Budgets" />
            <MenuLink to="/home/trend" label="Trend" />
            <MenuLink to="/categories" label="Categories" />
            <MenuLink to="/financialanalysis" label="Financial Analysis" />
          </ul>
        </header>
        <Switch>
          <Route exact path="/home/calendar">
            <Calendar />
          </Route>
          <Route exact path="/home/budget">
            <Budget />
          </Route>
          <Route path="/home/trend">
            <Trend />
          </Route>
          <Route path="/categories">
            <Category />
          </Route>
          <Route path="/financialanalysis">
            <FinancialAnalysis />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function MenuLink({ label, to }) {
  let match = useRouteMatch({ path: to });

  return (
    <li className={`tab-item ${match ? 'active' : ''} mr-2`}>
      <Link className="btn btn-link" to={to}>
        {label}
      </Link>
    </li>
  );
}

export default withRouter(Home);
