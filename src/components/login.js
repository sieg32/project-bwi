import { useState, useContext } from "react";
import axios from "axios";
import "../stylesheets/login.css";

import { userContext } from "./context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [remember, changeRemember] = useState(false);

  const { user, setUser } = useContext(userContext);

  //  input changes for username
  function handleUser(event) {
    setData((values) => ({ ...values, username: event.target.value }));
  }

  //  input changes for password
  function handlePassword(event) {
    setData((values) => ({ ...values, password: event.target.value }));
  }

  //  form submission
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // send login request to the server
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // check for failed login (status code 400)
      if (response.status === 400) {
        window.alert("Wrong username or password. Please try again.");
      }

      // set user if login is successful
      setUser(response.data);

      // store user data in localStorage if Remember me is checked
      if (remember) {
        try {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
        } catch (localStorageError) {
          console.error("Error storing data in localStorage:", localStorageError);
        }
      }

      // navigate to the home page after successful login
      navigate("/");

      
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="container">
      <div className="main">
        <img className="logo" src="logo512.png" alt="logo" />
        <h3>Sign in</h3>
        <form action="#">
          {/* field for username */}
          <div className="field">
            <input
              type="text"
              placeholder="Username"
              value={data.username || ""}
              onChange={handleUser}
            />
            <label>Username</label>
          </div>

          {/* field for password */}
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={data.password || ""}
              onChange={handlePassword}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* "Remember me" checkbox */}
          <div id="remember">
            <input
              type="checkbox"
              onChange={(e) => {
                changeRemember(!remember);
              }}
              value={remember}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Submit button */}
          <button id="submit" onClick={handleSubmit}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
