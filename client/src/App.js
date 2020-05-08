import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import HomePage from './components/homepage.component';
import NotFound from './components/notfound.component';

function Header(props) {

  const isLogin = localStorage.getItem("login")

  return <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to={"/sign-in"}>BeeWeb.am</Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"}>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
          </li>
          {isLogin && <li className="nav-item">
            <Link className="nav-link" onClick={() => {
               localStorage.removeItem("login");
               localStorage.removeItem("id");
           window.location = '/sign-in';
            }}>Log out</Link>
          </li>
        }
        </ul>
      </div>
    </div>
  </nav>
}

function App() {
  return (<Router>
    <div className="App">
      <Header />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={SignUp} />
            <Route path="/sign-in" render={props => <Login {...props} />} />
            <Route path="/sign-up" render={props => <SignUp {...props} />} />
            <Route path="/homepage" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
          
}

export default App;
