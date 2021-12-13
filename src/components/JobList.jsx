import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function JobList() {
  //const jobQuery = useParams().jobQquery;
  const [formInput, setFormInput] = useState("");
  //const [foundJob, setFoundJob] = useState([]);
  const [errorMsg, setError] = useState(null);

  const [allJob, setAllJob] = useState([]);

  function searchJob() {
    // const job = axios.get('...')
    // console.log(job);
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }
    axios
      .get("/api/job/find/" + formInput)
      .then((response) => {
        //setJob(response.data);
        setAllJob(response.data);
        console.log(response.data);
        console.log(response.data[0]._id)
      })
      .catch((error) =>
        setAllJob({
          title: "No job found",
          company: null,
        })
      );
    console.log("hello, there");

    // doSomething();
  }

  // function findAllJob() {
  //   axios
  //     .get("/api/job/findAll")
  //     .then((response) => {
  //       console.log(response.data);
  //       setAllJob(response.data);
  //     })
  //     .catch((error) => console.error(error));
  // }

  // useEffect(findAllJob, []);

  const jobListComponent = allJob.map((job) => {
    console.log(job._id)
    return (
      <>
        <p></p>
        <Link to={"job/" + job._id}>{job.title}</Link>
        <div>
          Company: {job.company}
        </div>

        <div>
          Location: {job.location}
        </div>
      </>
    );
  });

  return (
    <div>
      Enter a key word in job title here:
      <div>
        <input
          type="text"
          value={formInput}
          onChange={(e) => {
            setError(null);
            setFormInput(e.target.value);
          }}
        />
      </div>
      <button onClick={searchJob}>Search</button>
      {errorMsg}
      {/* <div>
        <button onClick={findAllJob}>Browse all jobs</button>
      </div> */}
      {jobListComponent}
    </div>
  );
}
