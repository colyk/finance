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

import Fade from 'react-reveal/Fade';

import Calendar from './Calendar';
import Budget from './Budget/Budget';
import Category from './Category/Category';
import Transaction from './Transaction/Transaction';
import UserSettings from './UserSettings';

function Home({ history }) {
  if (!sessionStorage.logged) history.push('/login');

  return (
    <Router>
      <Redirect to="/home/budget" />
      <div>
        <header className="navbar mb-1">
          <div className="navbar-section">
            <ul className="tab">
              <MenuLink to="/home/calendar" label="Calendar" />
              <MenuLink to="/home/budget" label="Budgets" />
              <MenuLink to="/home/category" label="Categories" />
              <MenuLink to="/home/transaction" label="Transactions" />
            </ul>
          </div>
          <div className="navbar-section">
            <ul className="tab">
              <MenuLink to="/home/user-settings" label="Settings" />
            </ul>
          </div>
        </header>
        <Switch>
          <Route exact path="/home/calendar">
            <Calendar />
          </Route>
          <Route exact path="/home/budget">
            <Budget />
          </Route>
          <Route path="/home/category">
            <Category />
          </Route>
          <Route path="/home/transaction">
            <Transaction />
          </Route>
          <Route path="/home/user-settings">
            <Fade right>
              <UserSettings />
            </Fade>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function MenuLink({ label, to }) {
  let match = useRouteMatch({ path: to });

  return (
    <li className={`tab-item ${match ? 'active' : ''} mx-2`}>
      <Link className="btn btn-link" to={to}>
        {label}
      </Link>
    </li>
  );
}

export default withRouter(Home);
