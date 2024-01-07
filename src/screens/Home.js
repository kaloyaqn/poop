import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

import Layout from "../components/layout";
import List from "../components/List";

export default function Home({ session }) {
  const userId = session.user.id;

  const [recents, setRecents] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [username, setUserName] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchRecents();
    fetchProfileData();
    console.log("session", session);
  }, []);

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
      setTimeout(() => {
        setScore(data[0].poop_score);
      }, 500);
    }
  }

  async function addPoop() {
    const { error } = await supabase
      .from("poops")
      .insert({ user: username, type: "Aко" });

    if (error === null) {
      addPoopScore();
      fetchRecents();
      setScore(score + 1)
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
    <Layout>
      <div className="bg-white rounded-[20px] p-5 text-[#504A45]">
        <p>Изакано общо</p>
        <h1 className="text-[#151616] text-3xl font-bold mb-10">{score}</h1>
        <h6 className="mb-5">Последни изаквания</h6>
        <div className="flex flex-col gap-5">
        {recents.map((recent) => (
          <div key={recent.index}>
            <List recents={recent}/>
          </div>
        ))}
        </div>
      </div>
      <div className="p-5">
          <button onClick={() => addPoop()} className="bg-[#5B3410] w-full p-3 font-semibold rounded-lg text-white">Добави изакване</button>
      </div>

    </Layout>
  );
}
