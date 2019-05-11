import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import Lessons from "./components/lessons/Lessons";
import Notifications from "./components/notifications/Notifications";
import Homework from "./components/homework/Homework";

import "./App.css";
import Materials from "./components/materials/Materials";
import Schedule from "./components/schedule/Schedule";

// Check for Token
if (localStorage.jwtToken) {
  //Set auth token
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear current profile
    // Redirect to login
    window.location = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/lessons" component={Lessons} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/homework" component={Homework} />
            <Route exact path="/materials" component={Materials} />
            <Route exact path="/schedule" component={Schedule} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
