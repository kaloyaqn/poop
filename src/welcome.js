import React, { useState } from "react";
import { supabase } from "./lib/supabase";
import { redirect, useNavigate } from "react-router-dom";

const Welcome = ({ session }) => {
  const [username, setUsername] = useState("");
  let userId = session.user.id;

  async function ChangeUsername() {
    const { error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", userId);

    console.log(username);

    console.log("Error", error);

    if (error === null) {
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="font-semibold text-3xl mb-1">Добре дошли! </h1>
      <h3 className="font-regular">Готови ли сте за първото си лайно?</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => ChangeUsername()}>izberi</button>
    </div>
  );
};

export default Welcome;
