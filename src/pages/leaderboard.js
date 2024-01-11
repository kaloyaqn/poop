import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { supabase } from "../lib/supabase";
import List from "../components/List";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("poop_score, username, avatar_url")
      .order("poop_score", { ascending: false });

    console.log(data);
    console.log(error);

    if (error === null) {
      setUsers(data);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.avatar_url) {
      if (users.avatar_url.includes("https://")) {
        setAvatarUrl(users.avatar_url);
      } else {
        downloadImage(users.avatar_url);
      }
    }
  }, [users.avatar_url]);

  async function downloadImage(path) {
    try {
      const { data: image, error } = await supabase.storage.from('avatars').download(path, { onDownloadProgress: console.log });
      
      if (error) {
        // Handle the case where the image does not exist
        if (error.message.includes('Object not found')) {
          setAvatarUrl(users.avatar_url); // Set the avatarUrl directly
        } else {
          throw error;
        }
      } else {
        const url = URL.createObjectURL(image);
        setAvatarUrl(url);
      }
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }
  

  return (
    <Layout>
        <div className="flex flex-col gap-6">
        {users.map((user, index) => (
        <div key={user.index}>
          <List data={user} index={index + 1} ListType={"leaderboard"} />
        </div>
      ))}
        </div>
    </Layout>
  );
};

export default Leaderboard;
