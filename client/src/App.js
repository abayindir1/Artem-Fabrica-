import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Alert from "./components/Alert/Alert";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Canvas from "./components/Canvas/Canvas";
import Posts from "./components/Posts/Posts"
 
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
          <Alert />
        <section className="landing-container container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          </Switch>
        </section>
        <section className="container">
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/profiles" component={Profiles}/>
            <PrivateRoute exact path="/profile/:id" component={Profile}/>
            <PrivateRoute exact path="/canvas" component={Canvas}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
          </Switch>
            
        </section>
      </Router>
    </Provider>
  );
}

export default App;
