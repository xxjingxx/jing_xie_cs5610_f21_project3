import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Div, JobBox } from "./PageStyle";

export default function JobList() {
  const jobQuery = useParams().jobQuery;
  const [errorMsg, setError] = useState(null);
  const [allJob, setAllJob] = useState([]);

  function searchJob() {
    axios
      .get("/api/job/find/" + jobQuery)
      .then((response) => {
        if (response.data.length === 0) {
          setError("No job found.");
        }
        setAllJob(response.data);
      })
      .catch((error) =>
        setAllJob({
          title: "No job found",
          company: null,
        })
      );
  }

  const jobListComponent = allJob.map((job) => {
    return (
      <JobBox>
        <Link to={"../job/" + job._id}>{job.title}</Link>
        <div>Company: {job.company}</div>

        <div>Location: {job.location}</div>
      </JobBox>
    );
  });

  return (
    <Container>
      <Div>Here are the {jobQuery} jobs:</Div>
      {searchJob()}
      {errorMsg}
      {jobListComponent}
    </Container>
  );
}
