import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Container, JobBox } from "./PageStyle";

export default function JobDetails() {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const id = useParams().id;
  useEffect(findJobDetails, []);

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
      .catch((error) => console.log(error))
  }
  useEffect(checkLogin, [userName]);

  function findJobDetails() {
    axios
      .get("/api/job/findById/" + id)
      .then((response) => {
        console.log(id);
        setJob(response.data);
        console.log(job);
      })
      .then((error) => console.log("Could not find Job"));
  }

  function saveToFavorites() {
    axios
      .post("/api/user/addFavorite", job)
      .then(navigate("/user/" + userName + "/favorite"))
      .catch((error) => {
        console.log(error);
      });
  }

  const jobComponent = job ? (
    <JobBox>
      <div>Title: {job.title}</div>
      <div>Company: {job.company}</div>
      <div>Location: {job.location}</div>
      <div>Description: {job.description}</div>
      <div>Email: {job.email}</div>
      {job.website ? (
        <>
          <div>Website: {job.website}</div>
        </>
      ) : (
        <></>
      )}
      <div>Post Date: {job.postDate}</div>
    </JobBox>
  ) : (
    <div> No longer available </div>
  );

  return userName === "" ? (
    <Container>
      <div>{jobComponent}</div>
    </Container>
  ) : (
    <Container>
      <div>{jobComponent}</div>
      <button onClick={() => saveToFavorites()}>Save to favorites</button>
    </Container>
  );
}
