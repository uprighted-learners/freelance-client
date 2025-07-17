import React, { use, useState } from 'react'

export default function AddJob({ sessionToken }) {
    const [ job, setJob ] = useState("")
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ salary, setSalary ] = useState("")
    const [ jobStatus, setjobStatus ] = useState("")

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
  return (
    <div>
        <div>
            <h1>JobSight</h1>
        </div>
        <div>
            <h1>Create a Job</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                value={name}
                placeholder='Enter Company name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                value={job}
                placeholder='Enter Job name'
                onChange={(e) => setJob(e.target.value)}
            
            />
            <input 
                type='text'
                value={description}
                placeholder='Enter job description'
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type='text'
                value={salary}
                placeholder='Enter salary'
                onChange={(e) => setSalary(e.target.value)}
            />
            <input 
                type="text" 
                value={jobStatus}
                placeholder='Enter job status'
                onChange={(e) => setjobStatus(e.target.value)}
            />
            <button className='go-btn'>Create Job</button>
        </form>
    </div>
  )
}
