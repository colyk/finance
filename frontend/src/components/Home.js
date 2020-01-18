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
import Budget from './Budget/Budget';
import Category from './Category';
import Transaction from './Transaction/Transaction';

function Home({ history }) {
  if (!sessionStorage.logged) history.push('/login');

  return (
    <Router>
      <Redirect to="/home/category" />
      <div>
        <header className="navbar mb-1">
          <ul className="tab">
            <MenuLink to="/home/calendar" label="Calendar" />
            <MenuLink to="/home/budget" label="Budgets" />
            <MenuLink to="/home/category" label="Categories" />
            <MenuLink to="/home/transaction" label="Transactions" />
          </ul>
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
