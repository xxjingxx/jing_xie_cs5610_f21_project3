const Schema = require("mongoose").Schema;

exports.JobSchema = new Schema(
  {
    title: String,
    company: String,
    location: String,
    description: String,
    email: String,
    website: String,
    owner: String,
    postDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "jobs" }
);
