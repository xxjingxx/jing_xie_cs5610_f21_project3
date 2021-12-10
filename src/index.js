import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import JobTracker from './JobTracker';
import JobList from './JobList';
import Register from './Register';
import SignIn from './SignIn';
import JobSearch from './JobSearch';
import LogOut from './LogOut';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
//import './custom.scss';
//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.



ReactDOM.render(
  <>
  <h1>Job Board</h1>
  <Router>
    <button>
      <Link to={"/"}>Sign in</Link>
    </button>
    <button>
      <Link to={"/search"}>Search</Link>
    </button>
    <button>
      <Link to={"/post"}>Post</Link>
    </button>
    {/* <button>
      <Link to={"/logout"}>Log out</Link>
    </button> */}
    <LogOut />

    <Routes>
      {/* <Route path="/logout" element={<LogOut />} /> */}
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/search" element={<JobList />}>
        {/* <Route path=":searchMode" element={<JobList />}/> */}
      </Route>
      {/* <Route path="/list" element={<JobList />} /> */}
      <Route path="/post" element={<JobTracker />}/>
    </Routes>
  </Router>
  </>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
