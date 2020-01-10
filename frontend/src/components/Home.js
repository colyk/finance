import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Calendar from './Calendar';
import Budget from './Budget';
import Trend from './Trend';
import Category from './Category';
import FinancialAnalysis from './FinancialAnalysis';

function Home() {
  return (
    <Router>
      <Redirect to="/financialanalysis" />
      <div>
        <header className="navbar">
          <section className="navbar-section">
            <MenuLink to="/home/calendar" label="Calendar" />
            <MenuLink to="/home/budget" label="Budgets" />
            <MenuLink to="/home/trend" label="Trend" />
            <MenuLink to="/categories" label="Categories" />
            <MenuLink to="/financialanalysis" label="Financial Analysis" />
          </section>
          <section className="navbar-center">{/* <!--Expense centered logo or brand --> */}</section>
          <section className="navbar-section">
            {/* <a href="#" className="btn btn-link">Twitter</a>
            <a href="#" className="btn btn-link">GitHub</a> */}
          </section>
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
    <div className={match ? 'active' : ''}>
      <Link className="btn btn-link" to={to}>
        {label}
      </Link>
    </div>
  );
}

export default Home;
