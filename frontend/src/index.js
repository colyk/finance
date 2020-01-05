import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './styles/index.css';

import SingIn from './components/SingIn';
import SingUp from './components/SingUp';

ReactDOM.render(<App />, document.getElementById('root'));

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <SingIn />
        </Route>
        <Route path="/signup">
          <SingUp />
        </Route>
        <Route path="/">
          <SingIn />
        </Route>
      </Switch>
    </Router>
  );
}
