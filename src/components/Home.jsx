import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Div, JobBox } from "./PageStyle";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState("");
  const [errorMsg, setError] = useState(null);
  const [allJob, setAllJob] = useState([]);

  function searchJob() {
    setAllJob([]);
    if (!formInput) {
      setError("You must type in a keyword.");
      return;
    }
    navigate("/search/" + formInput);
  }

  function findAllJob() {
    setError(null);
    setAllJob([]);
    axios
      .get("/api/job/findAll")
      .then((response) => {
        console.log(response.data);
        setAllJob(response.data);
      })
      .catch((error) => console.error(error));
  }

  const jobListComponent = allJob.map((job) => {
    return (
      <JobBox>
        <Link to={"job/" + job._id}>{job.title}</Link>
        <div>Company: {job.company}</div>

        <div>Location: {job.location}</div>
      </JobBox>
    );
  });

  return (
    <Container>
      <Div>Search by entering a job title key word:</Div>

      <Div>
        <input
          type="text"
          value={formInput}
          onChange={(e) => {
            setError(null);
            setFormInput(e.target.value);
          }}
        />
        <button onClick={() => searchJob()}>Search</button>
        <button onClick={() => findAllJob()}>Browse all jobs</button>
      </Div>
      {errorMsg}
      {jobListComponent}
    </Container>
  );
}
