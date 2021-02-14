import React, { createContext, useReducer, useEffect, useContext } from "react";
import { userReducer, intialState } from "./context/user/userReducer";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/navbar.component";
import HomePage from "./pages/homepage/homepage";
import ProfilePage from "./pages/profilepage/profilepage";
import SigninPage from "./pages/signinpage/siginpage";
import SignupPage from "./pages/signuppage/signuppage";
import CreatePost from "./pages/createpost/createpost";

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    // state && <Redirect from="/signin" to="/" />
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/signin">
        <SigninPage />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </Switch>
  );
};
export const UserContext = createContext("");
function App() {
  const [state, dispatch] = useReducer(userReducer, intialState);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <NavBar />
          <Routing />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
