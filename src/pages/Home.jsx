import React from "react";
import Card from "../components/Card";

function Home() {
  return (
    <div className="mx-8 my-4">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"Questions"}
            exam_def={"Add, delete, modify questions"}
            url={"/questions"}
          />
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"Exams"}
            exam_def={"Add, delete, modify exams"}
            url={"/exams"}
          />
        </div>
      </div>
      <div className="flex flex-col mt-4 w-full lg:flex-row">
        <div className="grid flex-grow h-auto card rounded-box place-items-center">
          <Card
            exam_name={"Express"}
            exam_def={"Quick ai like features"}
            url={"/express"}
          />
        </div>
        {/* <div className="divider lg:divider-horizontal">OR</div> */}
      </div>
    </div>
  );
}

export default Home;
