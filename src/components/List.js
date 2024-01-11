import React, { useEffect, useState } from "react";

import Moment from "moment";
import "moment/locale/bg";
import Avatar from "./Avatar";

const List = ({ data,index, ListType, avatarUrl }) => {
  console.log(data);

  if (ListType === 'recent') {
    return <RecentList data={data} />
  }

  if (ListType === 'leaderboard') {
    return <LeaderboardList avatarUrl={avatarUrl} data={data} index={index}/>
  }
  

};

const RecentList = ({data}) => {
  return (
    <div className="flex justify-between">
      <div>
        <h6 className="font-semibold text-[#161515] mb-0 p-0 leading-4">{data.type}</h6>
        <span className="text-[#655D56] text-sm m-0 p-0">
          {data.user} {" "} ·{" "}
          {Moment(data.created_at).locale("bg").format("D MMM h:mm")}ч.
        </span>
      </div>
      <h1 className="font-semibold">
        +{data.score}
      </h1>
    </div>
  );
}

const LeaderboardList = ({ data, index, avatarUrl }) => {
  const [scoreText, setScoreText] = useState(null);

  let poop_score = data.poop_score;

  useEffect(() => {
    // Add logic to set scoreText based on poop_score
    if (poop_score === 0) {
      setScoreText("Не е акал до сега");
    } else if (poop_score === 1) {
      setScoreText("1 лайно");
    } else {
      setScoreText(`${poop_score} лайна`);
    }
  }, [poop_score]);

  return (
    <div className="flex items-center">
      {index}

      <div className="flex items-center ml-4">
      <Avatar url={data.avatar_url} size={50} hasUpload={false} />

    <div className="ml-3 flex flex-col">
    <h6 className="font-semibold text-[#161515] mb-0 p-0 leading-4">{data.username}</h6>
        <span className="text-[#655D56] text-sm m-0 p-0">
          {scoreText}
        </span>
    </div>
      </div>
    </div>
  );
};

export default List;
