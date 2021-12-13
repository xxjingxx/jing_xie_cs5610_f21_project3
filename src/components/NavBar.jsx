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
} from "./NavbarElements";

export default function NavBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  function checkLogin() {
    //let isMounted = true;
    axios
      .get("/api/user/whoIsLoggedIn")
      .then((response) => {
        //if (isMounted)
        console.log(response.data);
        setUserName(response.data);
        console.log(userName);
        console.log("Success");
      })
      .catch((error) => console.log(error));
    //return () =>{isMounted = false}
  }

  useEffect(checkLogin, [userName]);

  const navBar =
    userName === "" ? (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/post" activeStyle>
              Post
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
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            <NavLink to="/post" activeStyle>
              Post
            </NavLink>

            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavLink to="/">{userName}</NavLink>
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
