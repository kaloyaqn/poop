import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { supabase } from "../lib/supabase";
import List from "../components/List";
import { Skeleton } from "../components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

const Leaderboard = ({ session }) => {
  const [users, setUsers] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = session.user.id;

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("poop_score, username, avatar_url, id")
      .order("poop_score", { ascending: false });

    // console.log(data);
    // console.log(error);

    if (error === null) {
      setUsers(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    console.log(userId);
  }, []);

  async function downloadImage(path) {
    try {
      const { data: image, error } = await supabase.storage
        .from("avatars")
        .download(path, { onDownloadProgress: console.log });

      if (error) {
        // Handle the case where the image does not exist
        if (error.message.includes("Object not found")) {
          setAvatarUrl(users.avatar_url); // Set the avatarUrl directly
        } else {
          throw error;
        }
      } else {
        const url = URL.createObjectURL(image);
        setAvatarUrl(url);
      }
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-1">
        {users.map((user, index) => (
          <div key={user.index}>
            {loading ? (
              <div className="flex items-center space-x-4 mb-9">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <List
                    loading={loading}
                    data={user}
                    userId={userId}
                    index={index + 1}
                    ListType={"leaderboard"}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Leaderboard;
