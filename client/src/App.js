import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "./App.css"

import Navbar from './components/Navbar/Navbar';
import Landing from "./components/Landing/Landing"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"


function App() {
  return (
    <Router>
    <Navbar/>
    <Route exact path="/" component={Landing}/>
    <section className="container">
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </section>
   </Router>
  );
}

export default App;
