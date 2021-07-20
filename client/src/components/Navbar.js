import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar, Typography } from "@material-ui/core";
import avatarImage from "../utils/avatar.png";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      {user ? (
        <>
          <div claaName="logo">
            <Typography component={Link} to="/">
              sOCIAL
            </Typography>
            <Avatar src={avatarImage} />
            {user.username}
          </div>
          <div className="options">
            <Typography component="button" onClick={logout}>
              SignOut
              <ExitToAppIcon />
            </Typography>
          </div>
        </>
      ) : (
        <>
          <div claaName="logo">
            <Typography component={Link} to="/">
              sOCIAL
            </Typography>
          </div>
          <div className="options">
            <div className="options_link">
              <Typography component={Link} to="/register">
                Register
              </Typography>
            </div>
            <div className="options_link">
              <Typography component={Link} to="/login">
                Login
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
