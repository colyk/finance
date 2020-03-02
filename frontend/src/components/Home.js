import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';

import Slide from 'react-reveal/Slide';

import Calendar from './Calendar';
import Budget from './Budget/Budget';
import Category from './Category/Category';
import Transaction from './Transaction/Transaction';
import Analytic from './Analytic';
import UserSettings from './UserSettings';
import Error from './Error';

function Home({ history }) {
  if (!sessionStorage.logged) history.push('/login');
  const [showUserSettings, toggleUserSettings] = useState(false);

  return (
    <div>
      <Error />
      <Router>
        <Redirect to="/home/transaction" />
        <div>
          <header className="navbar mb-1">
            <div className="navbar-section">
              <ul className="tab">
                <MenuLink to="/home/calendar" label="Calendar" />
                <MenuLink to="/home/budget" label="Budgets" />
                <MenuLink to="/home/category" label="Categories" />
                <MenuLink to="/home/transaction" label="Transactions" />
                <MenuLink to="/home/analytic" label="Analytics" />
              </ul>
            </div>
            <div className="navbar-section">
              <ul className="tab">
                <li
                  className="tab-item btn btn-link mx-2"
                  onClick={() => {
                    toggleUserSettings(!showUserSettings);
                  }}
                >
                  <i className={`icon ${showUserSettings ? 'icon-cross' : 'icon-menu'}`}></i>
                </li>
              </ul>
            </div>
          </header>
        </div>
        <Slide collapse right when={showUserSettings}>
          <UserSettings />
        </Slide>
        <Switch>
          <Route path="/home/calendar">
            <Calendar />
          </Route>
          <Route path="/home/budget">
            <Budget />
          </Route>
          <Route path="/home/category">
            <Category />
          </Route>
          <Route path="/home/transaction">
            <Transaction />
          </Route>
          <Route path="/home/analytic">
            <Analytic />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function MenuLink({ label = '', to, icon = '' }) {
  let match = useRouteMatch({ path: to });

  return (
    <li className={`tab-item ${match && !icon ? 'active' : ''} mx-2 `}>
      <Link className={`${icon} btn btn-link`} to={to}>
        {label}
      </Link>
    </li>
  );
}

export default withRouter(Home);
