import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { UserList } from './UserList'

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
          <Switch>
            <Route exact path="/">
              <Link to={'/users'}>To users</Link>
            </Route>
            <Route path="/users">
              <Link to={'/'}>Back</Link>
              <UserList />
            </Route>
          </Switch>
          </header>
        </div>
      </Router>
  );
}

export default App;
