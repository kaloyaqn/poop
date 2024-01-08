import React from "react";
import Layout from "./components/layout";
import { supabase } from "./lib/supabase";

const Profile = () => {
  return (
    <Layout>
      Profile
      <button
        className="bg-red-900"
        onClick={() => {
          const { error } = supabase.auth.signOut();
        }}
      >
        izlez
      </button>
    </Layout>
  );
};

export default Profile;
