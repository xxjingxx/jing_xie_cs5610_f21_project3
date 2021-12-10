import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function() {
    const title = useParams().title;

    function findJobDetails() {

        axios.get('/api/job/find/' + title)
            .then(response => setJob(response.data))
            .then(error => console.log("Could not find Job"));

    }


    const [job, setJob] = useState(null);
    useEffect(findJobDetails, []);


    const jobComponent = job ? 
        (<><div>
            Title: {job.title}
        </div>
        <div>
            Company: {job.company} 
        </div>
        <div>
            Location: {job.location}
        </div>
        <div>
            Description: {job.description}
        </div>
        <div>
            Email: {job.email}
        </div>
        <div>
            Website: {job.website}
        </div>
        <div>
            Post Date: {job.postDate}
        </div>
        </>) :
        (<div> No Job found </div>);

    return (
        <div>
            {jobComponent}
        </div>
    )
}