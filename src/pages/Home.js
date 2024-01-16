import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

import Confetti from "react-confetti";

import { useWindowSize } from "@uidotdev/usehooks";

import Layout from "../components/layout";
import List from "../components/List";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";

import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import Leaderboard from "./leaderboard";
import Recents from "./Recents";
import RecentsComponent from "../components/Information/RecentsComponent";
import AddPoopBtn from "../components/Buttons/AddPoopBtn";

import moment from "moment";
import { reload } from "react-router-dom";

export default function Home({ session }) {
  const userId = session.user.id;
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <Layout session={session}>
          <nav className="mb-4 flex flex-row gap-3">
            <button
              onClick={() => setActiveTab("tab1")}
              className="bg-white rounded-full border-[1px] border-[#F0F0F0] pt-[10px] pb-[10px] p-4 text-sm"
            >
              Начало
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={
                activeTab ===
                "rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]"
                  ? "bg-white rounded-full border-[1px] border-[#F0F0F0] pt-[10px] pb-[10px] p-4 text-sm"
                  : "rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]"
              }
            >
              Нещо
            </button>
            <button className="rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]">
              Нещо
            </button>
            <button
              className={
                activeTab ===
                "rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]"
                  ? "bg-white rounded-full border-[1px] border-[#F0F0F0] pt-[10px] pb-[10px] p-4 text-sm"
                  : "rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]"
              }
            >
              Нещо
            </button>
          </nav>

          {activeTab === "tab1" ? (
            <HomePage
              session={session}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Leaderboard />
          )}
        </Layout>
      )}
    </AnimatePresence>
  );
}

const HomePage = ({ session, isLoading, setIsLoading }) => {
  const userId = session.user.id;

  const { width, height } = useWindowSize();
  const [recents, setRecents] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [username, setUserName] = useState([]);
  const [score, setScore] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [lastPoop, setLastPoop] = useState(null);
  const [poopType, setPoopType] = useState("Нормално"); //twa e state za tipa laino
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);

  useEffect(() => {
    fetchRecents();
    fetchProfileData();
    console.log("session", session);
  }, []);

  useEffect(() => {
    if (lastPoop !== null) {
      // If lastPoop is not null, then it has been fetched
      comapreLastPoop();
    }
  }, [lastPoop]);

  const handleCelebrate = () => {
    setCelebrate(true);
    // You can set a timeout to stop the confetti after a certain duration
    setTimeout(() => setCelebrate(false), 5000); // 5000 milliseconds (5 seconds) in this example
  };

  async function fetchRecents() {
    const { data, error } = await supabase
      .from("poops")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    // console.log(data);
    // console.log(error);

    if (error === null) {
      setRecents(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  //fetchvame data za profila ot tablica profiles
  async function fetchProfileData() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    // console.log('PROFILAA',);
    // console.log('PROFILA',error);

    if (error === null) {
      setProfileInfo(data);
      setUserName(data[0].username);
      setScore(data[0].poop_score);
      setLastPoop(new Date(data[0].last_poop));
    }
  }

  //dobawqme ako
  async function addPoop() {
    const { error } = await supabase
      .from("poops")
      .insert({ user: username, type: poopType });

    if (error === null) {
      addPoopScore();
      fetchRecents();
      setScore(score + 1);
      toast.success("Честито изакване", {
        icon: "🎉 ",
      });
      setCelebrate(true);
      isButtonDisabled(true);
    }

    console.log("Error", error);
  }

  function comapreLastPoop() {
    // 1. plavni dvijeniq
    const timeNow = new Date();

    const nextPoopTime = new Date(lastPoop.getTime() + 25 * 60000); // .getTime() vrushta unix milliseconds; 25 * 60000 = 25 minuti v millisekundi

    const diff = (nextPoopTime - timeNow) / 60000; // razlikata / 60000 za da q prevurnem v minuti

    //2. trqbva da ste mnogo burz

    if (Math.abs(diff) >= 25) { // abs() zashtoto ako timeNow > nextPoopTime diff-a e otricatelen
      console.log("moje");
      setIsButtonDisable(true);
    }
    else {
      console.log("cent");
      setIsButtonDisable(false);
    }    
  }

  //dobavqme ako v tablica profiles.score
  async function addPoopScore() {
    const { data, error } = await supabase
      .from("profiles")
      .update({ poop_score: profileInfo[0].poop_score + 1 })
      .eq("id", userId);

    console.log("dobavqme", error);
  }

  return (
    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={celebrate ? 200 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setCelebrate(false);
          confetti.reset();
        }}
      />

      <div className="bg-white rounded-[20px] p-5 text-[#504A45] transition-transform">
        <p>Изакано общо</p>
        <h1 className="text-[#151616] text-3xl font-bold mb-10">{score}</h1>
        <h6 className="mb-5">Последни изаквания</h6>
        <RecentsComponent showButton={true} height="10rem" recents={recents} />
      </div>
      <AddPoopBtn
        timeDiff={timeDiff}
        isButtonDisabled={isButtonDisabled}
        poopType={poopType}
        setPoopType={setPoopType}
        session={session}
        addPoop={addPoop}
      />
    </motion.div>
  );
};
const LeaderboardPage = () => {
  return <>Leaderboard</>;
};
