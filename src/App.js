import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import JobTracker from './components/JobTracker';
import JobList from './components/JobList';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import Navbar from './components/NavBar';
import JobDetails from './components/JobDetails';
//import reportWebVitals from './reportWebVitals';
import axios from 'axios';
//import './custom.scss';
//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

export default function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      {/* <Route path="/logout" element={<LogOut />} /> */}
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/register" element={<Register />}/> */}
      <Route path="/" element={<JobList />} />
        <Route path="job/:id" element={<JobDetails />} />
      
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/list" element={<JobList />} /> */}
      <Route path="/post" element={<JobTracker />}/>
      {/* <Route path="/logout" element={<LogOut />}/> */}
    </Routes>
  </Router>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
