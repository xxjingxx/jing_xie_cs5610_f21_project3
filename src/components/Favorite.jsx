import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { JobBox, Container } from "./PageStyle";

export default function Favorite() {
  const [myFavorites, setMyFavorites] = useState([]);

  function findFavorites() {
    axios
      .get("/api/user/myFavorite")
      .then((response) => {
        setMyFavorites(response.data);
      })
      .catch((error) => console.log(error));
  }

  const favoriteList = myFavorites.map((job) => {
    console.log("job" + job.company);
    return (
      <JobBox>
        <Link to={"../job/" + job._id}>{job.title}</Link>
        <div>Company: {job.company}</div>

        <div>Location: {job.location}</div>
        <button
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              axios.delete("/api/user/deleteFavorite", job);
          }}
        >
        Remove from favorite
        </button>
      </JobBox>
    );
  });

  return (
    <Container>
      Favorites
      {findFavorites()}
      {favoriteList}
    </Container>
  );
}
