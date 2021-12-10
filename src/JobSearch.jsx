import { useState } from 'react';
import axios, { Axios } from 'axios';

function JobSearch() {
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    title: 'No job selected', company: null,
  })
  const [errorMsg, setError] = useState(null);

  function searchJob() {
    // const job = axios.get('...')
    // console.log(job);
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }
    axios.get('/api/job/find/' + formInput)
      .then(response => {
          //setJob(response.data);
          setJob ({
            title: response.data.foundJob[0].title,
            company: response.data.foundJob[0].company
          })
          
          console.log(response.data)
      })
      .catch(error => setJob({
        title: "No job found",
        company: null, 
      }));
    console.log("hello, there");

    // doSomething();
  }

  return (
    <div>
      {errorMsg}
      <input type='text' value={formInput}
      onChange={(e) => {
        setError(null);
        setFormInput(e.target.value)
      
      }} />
      <button onClick={searchJob}>
        Search for Job
      </button>
      <div>
        Job Name: {job.title}
      </div>
      <div>
        Company: {job.company}
      </div>

    </div>
 
  );
}

export default JobSearch;