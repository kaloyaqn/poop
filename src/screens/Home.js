import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

import Confetti from "react-confetti";

import { useWindowSize } from "@uidotdev/usehooks";

import Layout from "../components/layout";
import List from "../components/List";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";

import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "../components/Loading";

export default function Home({ session }) {
  const userId = session.user.id;

  const { width, height } = useWindowSize();
  const [recents, setRecents] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [username, setUserName] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    fetchRecents();
    fetchProfileData();
    console.log("session", session);
  }, []);

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
      .limit(3);

    // console.log(data);
    // console.log(error);

    if (error === null) {
      setRecents(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

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
    }
  }

  async function addPoop() {
    const { error } = await supabase
      .from("poops")
      .insert({ user: username, type: "Aко" });

    if (error === null) {
      addPoopScore();
      fetchRecents();
      setScore(score + 1);
      toast.success("Честито изакване", {
        icon: "🎉 ",
      });
      setCelebrate(true);
    }

    console.log("Error", error);
  }

  async function addPoopScore() {
    const { data, error } = await supabase
      .from("profiles")
      .update({ poop_score: profileInfo[0].poop_score + 1 })
      .eq("id", userId);

    console.log("dobavqme", error);
  }

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
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Confetti
            width={width}
            height={height}
            numberOfPieces={celebrate ? 500 : 0}
            recycle={false}
            onConfettiComplete={(confetti) => {
              setCelebrate(false);
              confetti.reset();
            }}
          />

          <Layout>
            <nav className="mb-4 flex flex-row gap-3">
              <button className="bg-white rounded-full border-[1px] border-[#F0F0F0] pt-[10px] pb-[10px] p-4 text-sm">
                Начало
              </button>
              <button className="rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]">
                Нещо
              </button>
              <button className="rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]">
                Нещо
              </button>
              <button className="rounded-full pt-[10px] pb-[10px] p-4 text-sm text-[#56655D]">
                Нещо
              </button>
            </nav>

            <div className="bg-white rounded-[20px] p-5 text-[#504A45] transition-transform">
              <p>Изакано общо</p>
              <h1 className="text-[#151616] text-3xl font-bold mb-10">
                {score}
              </h1>
              <h6 className="mb-5">Последни изаквания</h6>
              <div className="flex flex-col gap-5 transition-all">
                {recents.map((recent) => (
                  <div key={recent.index}>
                    <List isLoading={setIsLoading} recents={recent} />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 pt-6 pb-6  bg-white rounded-[20px] mt-5">
              <div className="mb-3.5 flex justify-between items-center">
                <div className="rounded-full bg-red-900 w-11 h-11 flex justify-center items-center bg-gradient-to-r from-[#BBB0A7] to-[#D5AE8C]">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9 15.0542C18.275 14.5988 18.5 14.0422 18.5 13.4096C18.5 12.094 17.5 11.006 16.2 10.8795C16 9.58916 14.975 8.55181 13.675 8.3747C13.625 8.3494 13.55 8.3494 13.5 8.3494H7.75C7.325 8.3494 7 8.02048 7 7.59036C7 7.16024 7.325 6.83133 7.75 6.83133C8.025 6.83133 8.25 6.60361 8.25 6.3253C8.25 6.04699 8.025 5.81928 7.75 5.81928H6.5C4.85 5.81928 3.5 7.18554 3.5 8.85542C3.5 9.63976 3.8 10.3482 4.275 10.8795H4C2.625 10.8795 1.5 12.0181 1.5 13.4096C1.5 14.0422 1.725 14.6241 2.1 15.0542C0.875 15.4337 0 16.5976 0 17.9639C0 19.6337 1.35 21 3 21H17C18.65 21 20 19.6337 20 17.9639C20 16.5976 19.1 15.459 17.9 15.0542ZM4.5 8.85542C4.5 7.86868 5.225 7.03373 6.15 6.85663C6.05 7.08434 6 7.31205 6 7.59036C6 8.57711 6.775 9.36145 7.75 9.36145H13.25C14.175 9.36145 14.95 10.0193 15.175 10.8795H6.5C5.4 10.8795 4.5 9.96868 4.5 8.85542ZM4 11.8916H16C16.825 11.8916 17.5 12.5747 17.5 13.4096C17.5 14.2446 16.825 14.9277 16 14.9277H4C3.175 14.9277 2.5 14.2446 2.5 13.4096C2.5 12.5747 3.175 11.8916 4 11.8916ZM17 19.988H3C1.9 19.988 1 19.0771 1 17.9639C1 16.8506 1.9 15.9398 3 15.9398H17C18.1 15.9398 19 16.8506 19 17.9639C19 19.0771 18.1 19.988 17 19.988ZM9.75 4.04819V3.82048C9.75 2.83374 10.45 1.97349 11.4 1.77108C11.9 1.66988 12.25 1.23976 12.25 0.733735V0.506024C12.25 0.227711 12.475 0 12.75 0C13.025 0 13.25 0.227711 13.25 0.506024V0.733735C13.25 1.72048 12.55 2.58072 11.6 2.78313C11.1 2.88434 10.75 3.31446 10.75 3.82048V4.04819C10.75 4.32651 10.525 4.55422 10.25 4.55422C9.975 4.55422 9.75 4.32651 9.75 4.04819ZM13.9 3.28916C14.4 3.18795 14.75 2.75783 14.75 2.25181V2.0241C14.75 1.74578 14.975 1.51807 15.25 1.51807C15.525 1.51807 15.75 1.74578 15.75 2.0241V2.25181C15.75 3.23855 15.05 4.0988 14.1 4.30121C13.6 4.40241 13.25 4.83253 13.25 5.33855V5.56627C13.25 5.84458 13.025 6.07229 12.75 6.07229C12.475 6.07229 12.25 5.84458 12.25 5.56627V5.33855C12.25 4.35181 12.95 3.49157 13.9 3.28916Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#151616] font-medium leading-4">
                    Готов ли си да се изкаш?
                  </p>
                  <span className="text-[#655D56] text-[14px]">
                    Добави изакване, за да си най-лудия
                  </span>
                </div>
              </div>
              <PrimaryBtn onClick={() => addPoop()}>Добави изакване</PrimaryBtn>
            </div>
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
