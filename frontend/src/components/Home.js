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
import Trend from './Trend';

function Home() {
  return (
    <Router>
      <Redirect to="/home/calendar" />

      <div>
        <header className="navbar">
          <section className="navbar-section">
            <MenuLink to="/home/calendar" label="Calendar" />
            <MenuLink to="/home/trend" label="Trend" />
          </section>
          <section className="navbar-center">{/* <!-- centered logo or brand --> */}</section>
          <section className="navbar-section">
            {/* <a href="#" className="btn btn-link">Twitter</a>
            <a href="#" className="btn btn-link">GitHub</a> */}
          </section>
        </header>

        <hr />

        <Switch>
          <Route exact path="/home/calendar">
            <Calendar />
          </Route>
          <Route path="/home/trend">
            <Trend />
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
