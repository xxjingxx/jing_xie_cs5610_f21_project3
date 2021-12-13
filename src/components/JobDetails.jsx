import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function JobDetails() {
  const [job, setJob] = useState(null);

  const id = useParams().id;
  //const objectId = mongodb.ObjectID(id);
  useEffect(findJobDetails, []);

  function findJobDetails() {
    axios
      .get("/api/job/findById/" + id)
      .then((response) => {
        console.log(id)
        setJob(response.data);
        console.log(job);
      })
      .then((error) => console.log("Could not find Job"));
  }

  const jobComponent = job ? (
    <>
      <div>Title: {job.title}</div>
      <div>Company: {job.company}</div>
      <div>Location: {job.location}</div>
      <div>Description: {job.description}</div>
      <div>Email: {job.email}</div>
      <div>Website: {job.website}</div>
      <div>Post Date: {job.postDate}</div>
    </>
  ) : (
    <div> No Job found </div>
  );

  return <div>{jobComponent}</div>;
}
