import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobTracker from "./components/JobTracker";
import JobList from "./components/JobList";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Navbar from "./components/NavBar";
import JobDetails from "./components/JobDetails";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import JobEdit from "./components/JobEdit";
import UserPortal from "./components/UserPortal";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:jobQuery" element={<JobList />} />
        <Route path="job/:id" element={<JobDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<JobTracker />} />
        <Route path="/user/:name" element={<UserPortal />} />
        <Route path="/user/:name/favorite" element={<Favorite />} />
        <Route path="/user/:name/edit/:id" element={<JobEdit />} />
      </Routes>
    </Router>
  );
}
