const { response } = require("express");
const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.Model");
const auth_middleware = require("../auth_middleware.js");
const UserAccessor = require("../models/User.Model");
const bcrypt = require("bcryptjs");

// Returns all known jobs
router.get("/findAll", function (request, response) {
  UserModel.getAllUsers()
    .then((userResponse) => {
      response.status(200).send(userResponse);
    })
    .catch((error) => response.status(400).send(error));
});

router.post("/logout", function (req, res) {
  req.session.destroy();
  return res.send("ok");
});

router.post("/addFavorite", auth_middleware, function (request, response) {
  const job = request.body;
  const username = request.session.username;
  UserAccessor.addToFavorite(username, job)
    .then(response.send("Success!"))
    .catch((error) => response.status(400).send(error));
});

router.delete("/deleteFavorite", auth_middleware, function (request, response) {
  const jobId = request.body;
  const username = request.session.username;
  UserAccessor.deleteFavorite(username, jobId)
    .then(response.send("Success!"))
    .catch((error) => response.status(400).send(error));
});

router.get("/myFavorite", auth_middleware, function (request, response) {
  const username = request.session.username;
  return UserModel.findUserByUsername(username)
    .then((userResponse) => response.status(200).send(userResponse.favorites))
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get("/whoIsLoggedIn", auth_middleware, function (request, response) {
  const username = request.session.username;
  if (username) {
    return response.status(200).send(username);
  }
});

router.get("/whoIsLoggedInButWithoutMiddleware", function (request, response) {
  const username = request.session.username;

  return response.send(username);
});

router.get("/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }
  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        response.status(404).send("User not found");
      }

      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

router.post("/authenticate", function (request, response) {
  let { username, password } = request.body;
  if (!username || !password) {
    return response.status(422).send("Must include both password and username");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        return response.status(404).send("No user found with that username");
      }

      if (bcrypt.compareSync(password, userResponse.password)) {
        console.log(password);
        request.session.username = username;
        return response.status(200).send(username);
    } else {
      return response.status(404).send("No user found with that password");
    }
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.post("/", function (req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .send("Missing username: " + username + "or password:" + password);
  }

  password = bcrypt.hashSync(password, 4);

  return UserModel.insertUser({ username, password })
    .then((userResponse) => {
      return res.status(200).send(userResponse);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
