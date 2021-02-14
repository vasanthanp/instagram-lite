import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import materialize from "materialize-css";
const SignupPage = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) ||
      !password ||
      !name
    ) {
      materialize.toast({
        html: "please enter valid details",
        classes: "#f44336 red",
      });
      return;
    }
    const response = await fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      materialize.toast({ html: data.error, classes: "#f44336 red" });
      return;
    } else {
      materialize.toast({ html: data.message, classes: "#4caf50 green" });
      history.push("/signin");
    }
  };
  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-content ">
          <span className="card-title">
            <h4>Instagram</h4>
            <p>Sign up to see photos and videos from your friends.</p>
          </span>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className="btn waves-effect waves-light blue"
            onClick={handleClick}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="card signup-link">
        <p>
          Have an account? <Link to="/signin">Log in</Link>
        </p>
      </div>
    </div>
  );
};
export default SignupPage;
// Api reques using fetch
//

// const response = Axios({
//   headers: { "content-type": "application/json" },
//   method: "post",
//   url: "/signup",
//   data: {
//     name: "",
//     password: "",
//     email: "",
//   },
// }).then((res) => console.log(res.data));
