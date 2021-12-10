import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function LogOut() {
  const navigate = useNavigate;
  const button = (
    <button
      onClick={() =>
        axios
          .post("/api/user/logout")
          .then(() => navigate("/"))
          .catch(console.error)
      }
    >
      Log out
    </button>
  );
  return <>{button}</>;
}
