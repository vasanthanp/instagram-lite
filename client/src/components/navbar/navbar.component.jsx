import React, { useContext } from "react";
import "./navbar.styles.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const RenderNavigation = () => {
    const handleClick = () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      dispatch({ type: "CLEAR" });
      history.push("/signin");
    };
    if (state) {
      return (
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/createpost">create post</Link>
          </li>
          <li>
            <button className="btn red" onClick={handleClick}>
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={!state ? "/signin" : "/"} className="brand-logo left">
          Instagram | Lite
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <RenderNavigation />
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
