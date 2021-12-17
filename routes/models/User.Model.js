const mongoose = require("mongoose");
const UserSchema = require("../schema/User.Schema").UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  return UserModel.create(user);
}

function getAllUsers() {
  return UserModel.find().exec();
}

function findUserByUsername(username) {
  return UserModel.findOne({ username }).exec();
  // { username: username }
}

function addToFavorite(username, job) {
  return UserModel.findOneAndUpdate(
    { username: username },
    { $addToSet: { favorites: job } }
  );
}

function deleteFavorite(username, job) {
  return UserModel.findOneAndUpdate(
    { username: username },
    { $pull: { favorites: job } }
  );
}

module.exports = {
  insertUser,
  getAllUsers,
  findUserByUsername,
  addToFavorite,
  deleteFavorite,
};
