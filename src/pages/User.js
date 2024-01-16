import React, { useEffect } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const User = () => {
  const { id } = useParams();
  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("poop_score, username, avatar_url")
      .eq("username", id);

    console.log(data);
    console.log(error);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return <Layout>User</Layout>;
};

export default User;
