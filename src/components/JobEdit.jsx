import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { FormBox, Div, JobBox } from "./PageStyle";

export default function JobEdit(props) {
  const navigate = useNavigate();
  const id = useParams().id;
  const [job, setJob] = useState(null);
  useEffect(getJob, [job]);
  const jobElement = [];
  const [errorMsg, setError] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    email: "",
    website: "",
  });

  function handleReplace() {
    if (
      jobForm.title === "" ||
      jobForm.Company === "" ||
      jobForm.Location === "" ||
      jobForm.Description === "" ||
      jobForm.Email === ""
    ) {
      setError("You must fill out all the required parts.");
      return;
    }
    axios
      .post("/api/job/replace/" + id, jobForm)
      .catch((error) => setError(error))
      .then(navigate("/user/" + userName))
      .catch((error) => setError(error));
  }

  function getJob() {
    axios
      .get("/api/job/findById/" + id)
      .then((response) => {
        console.log(id);
        setJob(response.data);
        console.log(job);
      })
      .catch((error) => console.log("Could not find Job"));
    if (job) {
      jobElement.push(
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
      );
    }
  }

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
      .catch(() => navigate("/"));
  }
  useEffect(checkLogin, [userName]);

  return (
    <FormBox>
      {getJob()}
      <>Here is the job you want to edit:</>
      {jobElement}
      <Div>Edit job by filling out this form</Div>
      <div>
        <span style={{ color: `#ff0000`, fontStyle: `italic` }}>
          *: required
        </span>{" "}
      </div>
      <h5>
        Job Title<span style={{ color: `#ff0000` }}>*</span>:{" "}
      </h5>
      <input
        value={jobForm.title}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            title: e.target.value,
          })
        }
      ></input>
      <h5>
        Company<span style={{ color: `#ff0000` }}>*</span>:{" "}
      </h5>
      <input
        value={jobForm.company}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            company: e.target.value,
          })
        }
      ></input>
      <h5>
        Location<span style={{ color: `#ff0000` }}>*</span>:{" "}
      </h5>
      <input
        value={jobForm.location}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            location: e.target.value,
          })
        }
      ></input>
      <h5>
        Description<span style={{ color: `#ff0000` }}>*</span>:{" "}
      </h5>
      <input
        value={jobForm.description}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            description: e.target.value,
          })
        }
      ></input>
      <h5>
        Email<span style={{ color: `#ff0000` }}>*</span>:{" "}
      </h5>
      <input
        value={jobForm.email}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            email: e.target.value,
          })
        }
      ></input>
      <h5>Website: </h5>
      <input
        value={jobForm.website}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            website: e.target.value,
          })
        }
      ></input>
      <div style={{ color: `#ff0000` }}>{errorMsg}</div>
      <Div>
        <button onClick={() => handleReplace()}>Submit</button>
      </Div>
    </FormBox>
  );
}
