import { useEffect, useState } from "react";
import PrucBox from "../Information/PrucBox";
import { supabase } from "../../lib/supabase";

export default function Truc({ session, recents }) {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, id")
        .order("poop_score", { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-5">
      {recents.map((recent) => (
        <>{recent.free_text && (
          <div key={recent.index}>
          {/* Find the corresponding user for the recent item based on user_id */}
          {users.map((user) => {
            if (user.id === recent.user_id) {
              return <PrucBox key={recent.index} user={user} recent={recent} session={session}/>;
            }
            return null;
          })}
        </div>
        )}</>
      ))}
    </div>
  );
}
