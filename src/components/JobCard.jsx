import React from 'react'
import { useNavigate } from 'react-router-dom'


const JobCard = ({job}) => {
    const navigate = useNavigate();

    if (!job) {
        //avoid crashing when job prop is missing.
        return (
            <div className='bg-white border rounded-lg p-4 shadow-lg'>
                <p className='text-sm text-gray-500'>Job data unavailable</p>
            </div>
        )
    }
    
  return (
    <div onClick={()=>navigate(`/jobs/${job._id}`)} className='bg-white border rounded-lg p-4 shadow-lg transition cursor-pointer'>
      <h2 className='text-lg font-semibold text-gray-800'>{job.title}</h2>
      <p className='text-sm text-gray-500 mt-1'>{job.location || 'All India'}</p>
      <p className='text-sm text-green-600 mt-1'>{job.salary ? `₹${job.salary}` : 'Not Disclosed'}</p>
      <button onClick={(e)=>{
          e.stopPropagation();
          navigate(`/jobs/${job._id}`)
      }} className='mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>View Details</button>
    </div>
  )
}

export default JobCard