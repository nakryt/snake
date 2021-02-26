import React from "react";
import "./Header.scss";

import { NavLink } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { resetUser } from "../../context/reducer";

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useStateValue();
  return (
    <div className="header">
      <NavLink to="/game" activeClassName="active">
        Game
      </NavLink>
      <NavLink to="/results" activeClassName="active">
        Results
      </NavLink>
      {user.username && (
        <NavLink
          to="/"
          onClick={() => {
            dispatch(resetUser());
          }}
          style={{ color: "#fff" }}
        >
          SignOut
        </NavLink>
      )}
    </div>
  );
};

export default Header;
