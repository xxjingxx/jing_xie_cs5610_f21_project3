const express = require("express");
const auth_middleware = require("../auth_middleware");
const router = express.Router();
const JobAccessor = require("../models/Job.Model");

// Returns all known jobs
router.get("/findAll", function (request, response) {
  return JobAccessor.getAllJob()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/myJob", auth_middleware, function (request, response) {
  return JobAccessor.findJobByOwner(request.username)
    .then((foundJob) => response.status(200).send(foundJob))
    .catch((error) => response.status(400).send(error));
});

router.get("/findById/:id", function (req, res) {
  const jobQuery = req.params.id;
  return JobAccessor.findJobById(jobQuery)
    .then((foundJob) => res.status(200).send(foundJob))
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get("/find/:keyWord", function (req, res) {
  const jobQuery = req.params.keyWord;
  const re = new RegExp(jobQuery, "i");
  return JobAccessor.findJobByKeyWord(re)
    .then((foundJob) => {
      if (!foundJob) {
        return res.status(404).send("No job found!");
      }
      res.status(200).send(foundJob);
    })

    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.post("/create", auth_middleware, (request, response) => {
  const newJob = request.body;
  const { title, company, location, description, email, website, owner } =
    newJob;
  console.log(request.body);
  if (!title || !company || !location || !description || !email) {
    return response.status(402).send("Missing data");
  }
  newJob.owner = request.username;
  return JobAccessor.findJobMatchesAllFields(newJob).then((jobResponse) => {
    if (jobResponse.length) {
      response.status(402).send("Job already exists");
    } else {
      JobAccessor.insertJob(request.body)
        .then((jobResponse) => response.status(200).send(jobResponse))
        .catch((error) => response.status(400).send(error));
    }
  });
});

router.delete("/delete", (request, response) => {
  const id = request.body;
  return JobAccessor.deleteJobById(id)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.put("/replace/:id", (request, response) => {
  const jobId = request.params.id;
  const newJob = request.body;
  const { title, company, location, description, email, website } = newJob;
  if (!title || !company || !location || !description || !email) {
    return response.status(422).send("Missing data");
  }
  JobAccessor.deleteJobById(jobId);
  return JobAccessor.findJobMatchesAllFields(newJob).then((jobResponse) => {
    if (jobResponse.length) {
      response.status(402).send("Job with that name already exists");
    } else {
      JobAccessor.insertJob(request.body)
        .then((jobResponse) => response.status(200).send(jobResponse))
        .catch((error) => response.status(400).send(error));
    }
  });
});

router.get("/about", function (req, res) {
  res.send("Food is the best");
});

module.exports = router;
