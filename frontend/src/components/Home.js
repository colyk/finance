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
  const [showMenu, toggleMenu] = useState(false);

  return (
    <div>
      <Error />
      <Router>
        <Redirect to="/home/analytic" />
        <header>
          <nav className="navbar">
            <div className="navbar-section navbar-menu" id={showMenu ? 'show' : 'hide'}>
              <ul className="tab">
                <MenuLink to="/home/calendar" label="Calendar" toggleMenu={toggleMenu} />
                <MenuLink to="/home/budget" label="Budgets" toggleMenu={toggleMenu} />
                <MenuLink to="/home/category" label="Categories" toggleMenu={toggleMenu} />
                <MenuLink to="/home/transaction" label="Transactions" toggleMenu={toggleMenu} />
                <MenuLink to="/home/analytic" label="Analytics" toggleMenu={toggleMenu} />
              </ul>
            </div>
            <div className="navbar-section">
              <ul className="tab">
                <li
                  className="tab-item btn btn-link mx-2"
                  onClick={() => toggleUserSettings(!showUserSettings)}
                >
                  <i className={`icon ${showUserSettings ? 'icon-cross' : 'icon-people'}`}></i>
                </li>
                <li
                  className="tab-item btn btn-link mx-2 navbar-toggler"
                  onClick={() => toggleMenu(!showMenu)}
                >
                  <i className={`icon ${showMenu ? 'icon-cross' : 'icon-menu'}`}></i>
                </li>
              </ul>
            </div>
          </nav>
        </header>
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

function MenuLink({ label = '', to, icon = '', toggleMenu }) {
  let match = useRouteMatch({ path: to });

  return (
    <li className={`tab-item ${match && !icon ? 'active' : ''} mx-2 `}>
      <Link className={`${icon} btn btn-link`} to={to} onClick={() => toggleMenu(false)}>
        {label}
      </Link>
    </li>
  );
}

export default withRouter(Home);
