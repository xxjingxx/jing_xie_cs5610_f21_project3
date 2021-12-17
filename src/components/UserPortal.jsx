import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { JobBox, Container } from "./PageStyle";
import Alert from "react";

export default function UserPortal() {
  const userName = useParams().name;
  const navigate = useNavigate();
  const [myJob, setMyJob] = useState([]);

  function getMyJob() {
    axios
      .get("/api/job/myJob")
      .then((response) => {
        setMyJob(response.data);
      })
      .catch((error) => console.log(error));
  }

  const jobElement = [];
  for (let job in myJob) {
    jobElement.push(<div>{job.title}</div>);
  }

  const jobListComponent = myJob.map((job) => {
    return (
      <JobBox>
        <Link to={"../job/" + job._id}>{job.title}</Link>
        <div>Company: {job.company}</div>
        <div>Location: {job.location}</div>
        <div>Description: {job.description}</div>
        <div>Email: {job.email}</div>
        <div>Website: {job.website}</div>
        <div>PostDate: {job.postDate}</div>
        <button
          onClick={() => navigate("/user/" + userName + "/edit/" + job._id)}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              axios.delete("/api/job/delete", job._id);
          }}
        >
          Delete
        </button>
      </JobBox>
    );
  });

  return (
    <Container>
      <div>My jobs</div>
      {getMyJob()}
      {jobListComponent}
    </Container>
  );
}
