import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Icon,
} from "./NavbarStyle";

export default function NavBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  function checkLogin() {
    axios
      .get("/api/user/whoIsLoggedIn")
      .then((response) => {
        console.log(response.data);
        setUserName(response.data);
        console.log(userName);
        console.log("Success");
      })
      .catch((error) => console.log(error));
  }

  useEffect(checkLogin, [userName]);

  const navBar =
    userName === "" ? (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <Icon>Minions Job Board</Icon>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    ) : (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <Icon>Minions Job Board</Icon>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
            <NavLink to="/post" activeStyle>
              Post
            </NavLink>
            <NavLink to={"/user/" + userName + "/favorite"} activeStyle>
              Favorite
            </NavLink>
            <NavLink to={"/user/" + userName} activeStyle>
              My jobs
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavLink to={"/user/" + userName}>{userName}</NavLink>
            <button
              onClick={() =>
                axios
                  .post("/api/user/logout")
                  .then(() => {
                    navigate("/");
                    window.location.reload(false);
                  })
                  .catch(console.error)
              }
            >
              Log out
            </button>
          </NavBtn>
        </Nav>
      </>
    );
  return <>{navBar}</>;
}
