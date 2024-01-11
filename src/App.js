import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./welcome";
import Leaderboard from "./pages/leaderboard";
import Profile from "./Profile";
import Layout from "./components/layout";
import LoadingScreen from "./components/Loading";

const supabase = createClient(
  "https://zyuebxkjnotchjumbrqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dWVieGtqbm90Y2hqdW1icnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNzI1OTcsImV4cCI6MjAxOTg0ODU5N30.uljUag2sAZ1kEBuf8exQodk_Vy_q0sNO-FLgTPTKmFA"
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(sessionData?.session || null);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    // Display a loading spinner or any other loading indicator
    return <LoadingScreen />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home session={session} />,
    },
    {
      path: "/profile",
      element: <Profile session={session} />,
    },
    {
      path: "/welcome",
      element: <Welcome session={session} />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard session={session} />,
    },
  ]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        // ... (other props)
      />
    );
  } else {
    return <RouterProvider router={router}></RouterProvider>;
  }
}
