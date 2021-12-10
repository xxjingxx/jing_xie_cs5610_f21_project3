import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function JobTracker(props) {
  const navigate = useNavigate();

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    email: "",
    website: "",
  });

  const [myJob, setMyJob] = useState([]);

  function getMyJob() {
    axios
      .get("/api/job/myJob")
      .then((response) =>
        setMyJob({
          title: response.data.foundJob[0].title,
          company: response.data.foundJob[0].company,
          location: response.data.foundJob[0].location,
          description: response.data.foundJob[0].description,
          email: response.data.foundJob[0].email,
          website: response.data.foundJob[0].website,
        })
      )
      .catch((error) => console.log(error));
  }

  function checkLogin() {
    axios
      .get("/api/job/whoIsLoggedIn")
      .then(() => console.log("Success"))
      .catch(() => navigate("/"));
  }

  useEffect(getMyJob, []);

  useEffect(checkLogin, []);

  const jobElement = [];
  for (let job in myJob) {
    jobElement.push(
      <div>
        {job.title} {job.company} {job.location} {job.description} {job.email}
        {job.website}
      </div>
    );
  }

  return (
    <div>
      <h5>Job Title: </h5>
      <input
        value={jobForm.name}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            title: e.target.value,
          })
        }
      ></input>
      <h5>Company: </h5>
      <input
        value={jobForm.company}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            company: e.target.value,
          })
        }
      ></input>
      <h5>Location: </h5>
      <input
        value={jobForm.location}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            location: e.target.value,
          })
        }
      ></input>
      <h5>Description: </h5>
      <input
        value={jobForm.description}
        onChange={(e) =>
          setJobForm({
            ...jobForm,
            description: e.target.value,
          })
        }
      ></input>
      <h5>Email: </h5>
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

      <button
        onClick={() =>
          axios
            .post("/api/job/create", jobForm)
            .then((response) => {
              getMyJob();
              console.log(response);
            })
            .catch((error) => console.error(error))
        }
      >
        Submit
      </button>

      {jobElement}
    </div>
  );
}
