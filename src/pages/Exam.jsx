import React from "react";
import Card from "../components/Card";

function Exam() {
  return (
    <div className="mx-8 my-4">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"JEE Mains"}
            exam_def={"Joint Entrance Exam Mains"}
            image={
              "https://static.theprint.in/wp-content/uploads/2022/03/xxcsdcsd2022031012283320220310140153.jpg"
            }
            url={"/mains"}
          />
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"JEE Advance"}
            exam_def={"Joint Entrance Exam Advanced"}
            image={
              "https://education.sakshi.com/sites/default/files/images/2022/04/15/jee-advanced-1650010868.png"
            }
            url={"/advance"}
          />
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"NEET"}
            exam_def={"National Eligibility cum Entrance Test"}
            image={
              "https://theshillongtimes.com/wp-content/uploads/2020/10/NEET-logo.jpg"
            }
            url={"/neet"}
          />
        </div>
      </div>
    </div>
  );
}

export default Exam;
