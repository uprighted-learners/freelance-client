import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


export default function AddJob({ sessionToken }) {
    const [ job, setJob ] = useState("")
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ salary, setSalary ] = useState("")
    const [ jobStatus, setjobStatus ] = useState("")

    const [ jobId, setJobId ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = "http://127.0.0.1:4000/jobs/addjob"
        const info = { job: job, name: name, description: description, salary: salary, jobStatus: jobStatus }
        console.log(job)
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionToken
                }
            })

            const data = await res.json()
            console.log("Job created: ", data)
        } catch(err) {
            console.log(err)
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        const url = `http://127.0.0.1:4000/jobs/${jobId}`
        try{
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionToken
                }
            })
            const data = await res.json()
            console.log("Job deleted: ", data)
        } catch(err) {
            console.log(err)
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const url = `http://127.0.0.1:4000/jobs/${jobId}`
        const info = { job: job, name: name, description: description, salary: salary, jobStatus: jobStatus }
        if (job.trim() !== "") info.job = job;
        if (name.trim() !== "") info.name = name;
        if (description.trim() !== "") info.description = description;
        if (salary.trim() !== "") info.salary = salary;
        if (jobStatus.trim() !== "") info.jobStatus = jobStatus;
        try{
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionToken
                }
            })
            const data = await res.json()
            console.log("job updated", data)
        } catch(err) {
            console.log(err)
        }
    }
  return (
    <div>
        <div>
            <h1>JobSight</h1>
        </div>
        
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create a Job</h1>
                <TextField 
                    
                    id='filled-required'
                    label="Company Name"
                    variant='filled'
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Job Name"
                    variant='filled'
                    onChange={(e) => setJob(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Description"
                    variant='filled'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Salary"
                    variant='filled'
                    onChange={(e) => setSalary(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Job Status"
                    variant='filled'
                    onChange={(e) => setjobStatus(e.target.value)}
                />
                <div>
                    <Button variant='contained' type='submit'>Create</Button>
                </div>
                
            </form>
        </div>
        <div>
            <div>
                <h1>Delete Job</h1>
                <form onSubmit={handleDelete}>
                    <TextField 
                        id='filled-required'
                        label="Job ID"
                        variant='filled'
                        onChange={(e) => setJobId(e.target.value)}
                    />
                    
                    <div>
                        <Button variant='contained' type='submit'>
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <div>
                <h1>Update Job</h1>
                <form onSubmit={handleUpdate}>
                    <TextField
                        id='filled-required'
                        label="Job ID"
                        variant='filled'
                        onChange={(e) => setJobId(e.target.value)}
                    />
                <TextField 
                    
                    id='filled-required'
                    label="Company Name"
                    variant='filled'
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Job Name"
                    variant='filled'
                    onChange={(e) => setJob(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Description"
                    variant='filled'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Salary"
                    variant='filled'
                    onChange={(e) => setSalary(e.target.value)}
                />
                <TextField 
                    id='filled-required'
                    label="Job Status"
                    variant='filled'
                    onChange={(e) => setjobStatus(e.target.value)}
                />
                <div>
                    <Button variant='contained' type='submit'>Update</Button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
