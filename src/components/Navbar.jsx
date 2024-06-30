import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className="mx-2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink onClick={(e) =>{
                e.preventDefault();
                navigate(-1);
          }} className="btn btn-ghost text-sm sm:text-xl">{"<-- SCI-MCQ-Question Upload"}</NavLink>
        </div>
        <div className="flex-none">
          <details role="button" className="dropdown dropdown-end mr-8">
            <summary className="m-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
           </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <NavLink to={"/"} >Exam</NavLink>
              </li>
              <li>
                <NavLink to={"/year"} >Year</NavLink>
              </li>
              <li>
                <NavLink to={"/questions"} >Questions</NavLink>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
