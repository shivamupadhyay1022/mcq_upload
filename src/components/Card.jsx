import React from 'react'
import { NavLink } from 'react-router-dom'

function Card({image,exam_name,exam_def,url}) {
  return (
    <div className="card sm:min-w-96 w-auto bg-base-100 shadow-xl">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{exam_name}</h2>
    <p>{exam_def}</p>
    <div className="card-actions">
        <NavLink to={url} ><button className="btn btn-primary">Edit</button></NavLink>
    </div>

  </div>
</div>
  )
}

export default Card