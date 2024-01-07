import React from "react";

import Moment from "moment";
import "moment/locale/bg";

const List = ({ recents }) => {
  console.log(recents);
  return (
    <div className="flex justify-between">
      <div>
        <h6 className="font-semibold text-[#161515] mb-0 p-0 leading-4">{recents.type}</h6>
        <span className="text-[#655D56] text-sm m-0 p-0">
          {recents.user} {" "} ·{" "}
          {Moment(recents.created_at).locale("bg").format("D MMM h:mm")}ч.
        </span>
      </div>
      <h1 className="font-semibold">
        +{recents.score}
      </h1>
    </div>
  );
};

export default List;
