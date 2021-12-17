import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FormBox } from "./PageStyle";

export default () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    password: "",
    username: "",
  });

  const [loggedInName, setLoggedInName] = useState("");

  const getLogInName = () => {
    axios
      .get("/api/user/whoIsLoggedIn")
      .then((response) => {
        setLoggedInName(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <FormBox>
      <h3>Create a new account</h3>
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
              .post("/api/user/", userData)
              .then(() => navigate("/"))
              .catch((error) => console.log(error));
          }}
        >
          register
        </button>
      </div>

      {/* <div>
        <button
          onClick={() => {
            axios
              .get("/api/user/whoIsLoggedIn")
              .then((response) => {
                setLoggedInName(prev => ([response.data]));
                console.log(response.data);
                console.log(loggedInName);
              })
              .catch((error) => console.log(error));
          }}
        >
          Who is logged in
        </button>
      </div>
      {loggedInName && <div>{loggedInName}</div>} */}
    </FormBox>
  );
};
