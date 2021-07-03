import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import axiosWithAuth from './helpers/axiosWithAuth';

import "./styles.scss";

const handleLogout = () => {
  axiosWithAuth()
    .post("logout")
    .then(()=>{
      localStorage.removeItem('token');
      document.location.href = '/';
    });
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a id="logoutButton" onClick={handleLogout} href="#">logout</a>
        </header> 

        <Route exact path="/" component={Login} />
        <PrivateRoute component={BubblePage} path="/bubbles" />
      </div>
    </Router>
  );
}

export default App;
