import React from "react";
import List from "../List";
import SecondaryBtn from "../Buttons/SecondaryBtn";
import { Link } from "react-router-dom";

const RecentsComponent = ({ recents, height, className, showButton }) => {
  if (className === undefined) {
    className = " ";
  }

  return (
    <div
      className={`flex flex-col gap-5 transition-all overflow-scroll`}
      style={{height: height}}
    >
      {recents.map((recent) => (
        <div key={recent.index}>
          <List data={recent} ListType={"recent"} />
        </div>
      ))}
      <div className="w-full flex justify-center items-center mt-2">
        {showButton && (
          <Link to={"/recents"}>
            <SecondaryBtn>Виж всички</SecondaryBtn>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RecentsComponent;
