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

import moment from "moment-timezone";
import { reload } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import Pruc from "../components/Views/Pruc";
import Tabs from "../components/Navigation/Tabs";

export default function Home({ session }) {
  const userId = session.user.id;
  const [isLoading, setIsLoading] = useState(true);
  const [recents, setRecents] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [userRead, setUserRead] = useState(true); //za modala dava vreme dali butona e disablenat

  const closePopUp = () => {
    localStorage.setItem("seenPopUp", true);
    setDisplayPopUp(false);
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
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let returningUser = localStorage.getItem("seenPopUp");
    setDisplayPopUp(!returningUser);
    fetchRecents();
    setTimeout(() => {
      setUserRead(false);
    }, 10000);
  }, []);

  return (
    <Layout session={session}>
      {/* <nav className="mb-4 flex flex-row gap-3 overflow-x-auto">
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
          Пръц
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
      </nav> */}
      <Tabs
        setActiveTab={setActiveTab}
        items={[
          { to: "1", name: "Начало" },
          { to: "2", name: "Пръц" },
          { to: "3", name: "Нещо" },
          { to: "4", name: "Нещо" }
        ]}
      />
      <AlertDialog open={displayPopUp} onOpenChange={setDisplayPopUp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Край на тестовия период 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Изсиранията и историята на изсиране са{" "}
              <span className="font-bold">изтрити</span> на всички участници.
              Всички, които са се регистрирали по време на тестовия период ще
              получат <span className="font-bold">специален бадж</span>.
              Благодарим ви от екипа на Poop, приятно насиране 💩.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <PrimaryBtn disabled={userRead} onClick={() => closePopUp()}>
              Разбрах
            </PrimaryBtn>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {activeTab === "1" && (
        <HomePage
          session={session}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          recents={recents}
          fetchRecents={fetchRecents}
        />
      )}
      {activeTab === "2" && <Pruc session={session} recents={recents} />}
    </Layout>
  );
}

const HomePage = ({ session, isLoading, setIsLoading, recents, fetchRecents }) => {
  const userId = session.user.id;

  const { width, height } = useWindowSize();
  const [profileInfo, setProfileInfo] = useState([]);
  const [username, setUserName] = useState([]);
  const [score, setScore] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [lastPoop, setLastPoop] = useState(null);
  const [poopType, setPoopType] = useState("Нормално"); //twa e state za tipa laino
  const [isButtonDisabled, setIsButtonDisable] = useState(true);
  const [timeDiff, setTimeDiff] = useState(null);
  const [freeText, setFreeText] = useState("");

  useEffect(() => {
    fetchData();
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

  async function fetchData() {
    try {
      const [recentsResult, profileResult] = await Promise.all([
        fetchProfileData(),
      ]);

      console.log(isLoading);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  }

  //dobawqme ako
  async function addPoop() {
    const { error } = await supabase
      .from("poops")
      .insert({ type: poopType, user_id: userId, free_text: freeText, username: username });

    if (error === null) {
      addPoopScore();
      setScore(score + 1);
      toast.success("Честито изакване", {
        icon: "🎉 ",
      });
      setCelebrate(true);
      setIsButtonDisable(true);
      comapreLastPoop();
      fetchRecents();
    }

    console.log("Error", error);
  }

  function comapreLastPoop() {
    // 1. plavni dvijeniq
    const timeNow = new Date();
    console.log(timeNow);
    let posledno_laino = moment(lastPoop).tz("UTC+2").toDate(); // Parse the string to a Date object

    const nextPoopTime = new Date(posledno_laino.getTime() + 25 * 60000);
    const diff = (nextPoopTime - timeNow) / 60000;
    console.log(timeNow, nextPoopTime, diff);

    // 2. trqbva da ste mnogo burz
    if (Math.abs(diff) >= 25) {
      console.log("moje", Math.abs(diff), posledno_laino);
      setTimeDiff(diff);
      setIsButtonDisable(false);
    } else {
      console.log("cent");
      setIsButtonDisable(true);
      setTimeDiff(diff);
    }
  }

  //dobavqme ako v tablica profiles.score
  async function addPoopScore() {
    const { data, error } = await supabase
      .from("profiles")
      .update({ poop_score: profileInfo[0].poop_score + 1 })
      .eq("id", userId);

    if (error === null) {
      fetchProfileData();
      setIsButtonDisable(true);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <>
          <motion.div
            key="loading"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LoadingScreen />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
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
              <h1 className="text-[#151616] text-3xl font-bold mb-10">
                {score}
              </h1>
              <h6 className="mb-5">Последни изаквания</h6>
              <RecentsComponent
                showButton={true}
                height="10rem"
                recents={recents}
              />
            </div>
            <AddPoopBtn
              timeDiff={timeDiff}
              isButtonDisabled={isButtonDisabled}
              setIsButtonDisable={setIsButtonDisable}
              poopType={poopType}
              setPoopType={setPoopType}
              session={session}
              addPoop={addPoop}
              freeText={freeText}
              setFreeText={setFreeText}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
const LeaderboardPage = () => {
  return <>Leaderboard</>;
};
