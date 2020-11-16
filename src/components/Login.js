import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    username: "Lambda School",
    password: "i<3Lambd4",
  });

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="login-form">
      <h1>Bubbles!</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">
          username:
          <input
            id="username"
            type="text"
            value={formValues.username}
            onChange={handleChanges}
            name="username"
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            id="password"
            type="password"
            value={formValues.password}
            onChange={handleChanges}
            name="password"
          />
        </label>
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
