import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FormBox, Div } from "./PageStyle";

export default function JobTracker(props) {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    email: "",
    website: "",
  });

  const [myJob, setMyJob] = useState([]);
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

  const jobElement = [];
  for (let job in myJob) {
    jobElement.push(
      <div>
        {job.title} {job.company} {job.location} {job.description} {job.email}
        {job.website}
      </div>
    );
  }

  function handlePost() {
    if (
      jobForm.title === "" ||
      jobForm.company === "" ||
      jobForm.location === "" ||
      jobForm.description === "" ||
      jobForm.email === ""
    ) {
      setError("You must fill out all the required parts.");
      return;
    }
    axios
      .post("/api/job/create", jobForm)
      .catch((error) => setError(error))
      .then(navigate("/user/" + userName))
      .catch((error) => setError(error));
  }

  return (
    <FormBox>
      <Div>Welcome {userName}, post a new job here</Div>
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
        <button onClick={() => handlePost()}>Submit</button>
      </Div>
    </FormBox>
  );
}
