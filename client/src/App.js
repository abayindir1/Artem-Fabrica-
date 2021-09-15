import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Alert from "./components/Alert/Alert";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home/Home";
import Canvas from "./components/Canvas/Canvas";
import Posts from "./components/Posts/Posts"
import Post from "./components/Post/Post"
 
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
          <Alert />
        <section className="landing-container container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
        <section className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/canvas" component={Canvas}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute exact path="/posts/:id" component={Post}/>
          </Switch>
            
        </section>
      </Router>
    </Provider>
  );
}

export default App;
