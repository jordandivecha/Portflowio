import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import feed from './pages/feed';
import User from './pages/User';
import Nav from "./components/Nav";


const App = () =>

      <Router>
      <div>
        <Switch>
          <Route exact path="/" component={feed} />
          <Route exact path="/feed" component={feed} />
          <Route exact path="/User/:id" component={User} />
        </Switch>
      </div>
    </Router>;


export default App;
