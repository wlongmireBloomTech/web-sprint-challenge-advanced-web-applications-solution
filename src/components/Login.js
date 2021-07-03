import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const { push } = useHistory();

  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    return axios
        .post("http://localhost:5000/api/login", formValues)
        .then((res) => {
          console.log("got it...");
          localStorage.setItem("token", res.data.payload);
          setError("");
          push("/bubbles");
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setError("Username or Password not valid.");
          }
        });
  };
  
  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formValues.username}
          onChange={handleChanges}
        />
      
        <label htmlFor="password">password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChanges}
        />

        <p id="error" className="error">{error}</p>

        <button id="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
