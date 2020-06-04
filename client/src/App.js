import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Alert from "./components/Alert/Alert";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { userLoad } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(userLoad());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="landing-container container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
        <section className="container">
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
            
        </section>
      </Router>
    </Provider>
  );
}

export default App;
