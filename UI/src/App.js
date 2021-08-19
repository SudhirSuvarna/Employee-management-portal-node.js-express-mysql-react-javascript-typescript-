import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import { createRecord } from "./components/create.record.component";
import DisplayEmployees from "./components/display.employees";
import DisplayReviews from "./components/display.reviews";
import DisplayFeedback from "./components/display.feedback";
import CreateEmployeeFeedback from "./components/create.employee.feedback.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role === 'admin'
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            
          </Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  Employees
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/performance_reviews"} className="nav-link">
                  Performance reviews
                </Link>
              </li>
            )}

            {currentUser &&
              <li className="nav-item">
                <Link to={"/feedback"} className="nav-link">
                  Feedback
                </Link>
              </li>
            }
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/create/feedback" component={CreateEmployeeFeedback} />
            <Route exact path="/create/employee" component={createRecord} />
            <Route exact path="/create/review" component={createRecord} />
            <Route exact path="/employees" component={DisplayEmployees} />
            <Route exact path="/performance_reviews" component={DisplayReviews} />
            <Route exact path="/feedback" component={DisplayFeedback} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
