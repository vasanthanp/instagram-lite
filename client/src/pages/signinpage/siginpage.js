import React, { useState, useContext } from "react";
import materialize from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./signinpage.styles.css";
const SigninPage = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clickHandler = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) ||
      !password
    ) {
      materialize.toast({
        html: "please enter valid details",
        classes: "#f44336 red",
      });
      return;
    }
    const responce = await fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await responce.json();
    console.log(data);
    if (data.error) {
      materialize.toast({ html: data.error, classes: "#f44336 red" });
      return;
    } else {
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "USER", payload: data.user });
      materialize.toast({
        html: "Signed in successfully",
        classes: "#4caf50 green",
      });
      history.push("/");
    }
  };
  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-content ">
          <span className="card-title">
            <h4>Instagram</h4>
          </span>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="btn waves-effect waves-light blue"
            onClick={clickHandler}
          >
            Log In
          </button>
        </div>
      </div>
      <div className="card signup-link">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default SigninPage;
