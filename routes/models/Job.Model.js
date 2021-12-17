const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getAllJob() {
  return JobModel.find().exec();
}

function findJobByKeyWord(title) {
  return JobModel.find({ title: title }).exec();
}

function findJobMatchesAllFields(job) {
  return JobModel.find({
    title: job.title,
    company: job.company,
    location: job.location,
    description: job.description,
    email: job.email,
    website: job.website,
  }).exec();
}

function findJobById(id) {
  const _id = mongoose.Types.ObjectId(id);
  return JobModel.findById({ _id }).exec();
}

function findJobByOwner(owner) {
  return JobModel.find({
    owner: owner,
  });
}

function deleteJobById(id) {
  return JobModel.deleteOne({ id: id }).exec();
}

// Make sure to export a function after you create it!
module.exports = {
  insertJob,
  getAllJob,
  findJobById,
  deleteJobById,
  findJobMatchesAllFields,
  findJobByOwner,
  findJobByKeyWord,
};
