import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const UpdateJobs = () => {
    const { id } = useParams();
    // console.log(id)
    const {_id, jobTitle, companyName, companyLogo, minPrice, maxPrice, salaryType, jobLocation,
        postingDate, experienceLevel, employmentType, description, postedBy, skills
     } = useLoaderData()
  return (
    <div>UpdateJobs</div>
  )
}

export default UpdateJobs