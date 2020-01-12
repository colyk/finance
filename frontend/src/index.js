import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/index.css';

import 'spectre.css';
import '../node_modules/spectre.css/dist/spectre-icons.css';

import SingIn from './components/SingIn';
import SingUp from './components/SingUp';
import Home from './components/Home';

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
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <SingIn />
        </Route>
      </Switch>
    </Router>
  );
}
