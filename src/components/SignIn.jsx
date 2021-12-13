import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    password: "",
    username: "",
  });

  const [loggedInName, setLoggedInName] = useState("");

  return (
    <div>
      <h3>Please sign in</h3>
      <h5>Username:</h5>
      <input
        value={userData.username}
        onChange={(e) => {
          const username = e.target.value;
          setUserData({
            ...userData,
            username: username,
          });
        }}
      />
      <h5>Password:</h5>
      <input
        value={userData.password}
        onChange={(e) => {
          const password = e.target.value;
          setUserData({
            ...userData,
            password: password,
          });
        }}
        type="password"
      />
      <div>
        <button
          onClick={() => {
            axios
              .post("/api/user/authenticate", userData)
              .then((response) => {
                console.log(response.data);
                navigate("/")
                window.location.reload(false)
              })
              .catch((error) => console.log(error));
          }}
        >
          Sign in
        </button>
      </div>

      <div>
      New user? 
        <button
          onClick={() => 
            navigate("/signup")
          }
        >
        Sign up
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            axios
              .get("/api/user/whoIsLoggedIn")
              .then((response) => 
              {
                console.log(loggedInName)
                setLoggedInName(response.data)
                console.log(response)
                console.log(response.data)
                console.log(loggedInName)
                

              })
              .catch((error) => console.log(error));
          }}
        >
          Who is logged in
        </button>
      </div>
      {loggedInName && <div>{loggedInName}</div>}
    </div>
  );
};
