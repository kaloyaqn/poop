import React, { useEffect, useState } from "react";

import Moment from "moment";
import "moment/locale/bg";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDetectClickOutside } from "react-detect-click-outside";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Skeleton } from "./ui/skeleton";

const List = ({ data, index, ListType, avatarUrl, userId, loading }) => {
  // console.log(data);

  if (ListType === "recent") {
    return <RecentList data={data} />;
  }

  if (ListType === "leaderboard") {
    return (
      <LeaderboardList
        avatarUrl={avatarUrl}
        userId={userId}
        data={data}
        index={index}
        loading={loading}
      />
    );
  }
};

const RecentList = ({ data }) => {
  return (
    <div className="flex justify-between">
      <div>
        <h6 className="font-semibold text-[#161515] mb-0 p-0 leading-4">
          {data.type}
        </h6>
        <span className="text-[#655D56] text-sm m-0 p-0">
          {data.user} ·{" "}
          {Moment(data.created_at).locale("bg").format("D MMM h:mm")}ч.
        </span>
      </div>
      <h1 className="font-semibold">+{data.score}</h1>
    </div>
  );
};

const LeaderboardList = ({ data, index, avatarUrl, userId, loading }) => {
  const [scoreText, setScoreText] = useState(null);
  const [isYou, setIsYou] = useState(false);
  const [bgColor, setBgColor] = useState("none");
  const [openDrawer, setOpenDrawer] = useState(false);

  const ref = useDetectClickOutside({ onTriggered: closeDrawer });

  function closeDrawer() {
    setOpenDrawer(false);
  }

  function checkForYou() {
    if (userId === data.id) {
      setIsYou(true);
      setBgColor("#C8986C");
    }
  }

  let poop_score = data.poop_score;

  useEffect(() => {
    if (poop_score === 0) {
      setScoreText("Не е акал до сега");
    } else if (poop_score === 1) {
      setScoreText("1 лайно");
    } else {
      setScoreText(`${poop_score} лайна`);
    }
  }, [poop_score]);

  useEffect(() => {
    checkForYou();
  });

  return (
    <>
      {loading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <div
            className="flex items-center p-3 px-4 rounded-lg"
            style={{ background: bgColor }}
          >
            {index}

            <div className="flex items-center ml-4">
              <div className="first-place">
                <Drawer>
                  <DrawerTrigger asChild>
                    <button variant="outline">
                      <Avatar
                        url={data.avatar_url}
                        size={50}
                        hasUpload={false}
                      />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle className="w-full flex justify-center items-center">
                          <Avatar
                            url={data.avatar_url}
                            size={150}
                            hasUpload={false}
                          />
                        </DrawerTitle>
                        <DrawerDescription className="text-base">
                          {data.username}
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <div className="flex gap-4">
                          <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                            <span className="text-sm manrope">Лайнар от</span>
                            <p className="text-lg font-semibold">2024</p>
                          </div>
                          <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                            <span className="text-sm manrope">Изсирания</span>
                            <p className="text-lg font-semibold">
                              {data.poop_score}
                            </p>
                          </div>
                          <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                            <span className="text-sm manrope">Прогноза</span>
                            <p className="text-lg font-semibold">
                              {data.poop_score + 3}
                            </p>
                          </div>{" "}
                        </div>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="ml-3 flex flex-col">
                <h6 className="font-semibold text-[#161515] mb-0 p-0 leading-4">
                  {data.username}
                </h6>
                {isYou ? (
                  <span className="text-black text-sm m-0 p-0">
                    {scoreText}
                  </span>
                ) : (
                  <span className="text-[#655D56] text-sm m-0 p-0">
                    {scoreText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default List;
