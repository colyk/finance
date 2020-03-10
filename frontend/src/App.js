import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'spectre.css';
import '../node_modules/spectre.css/dist/spectre-icons.css';

import SingIn from './components/SingIn';
import SingUp from './components/SingUp';
import Home from './components/Home';

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

export default App;
