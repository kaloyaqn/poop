import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Home from "./pages/Home";
import { redirect, Route, Router, Routes, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./welcome";
import Leaderboard from "./pages/leaderboard";
import LoadingScreen from "./components/Loading";
import Recents from "./pages/Recents";
import { AnimatePresence } from "framer-motion";
import User from "./pages/User";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

const supabase = createClient(
  "https://zyuebxkjnotchjumbrqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dWVieGtqbm90Y2hqdW1icnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNzI1OTcsImV4cCI6MjAxOTg0ODU5N30.uljUag2sAZ1kEBuf8exQodk_Vy_q0sNO-FLgTPTKmFA"
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);


  
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BD05wxbG4BsF_voCuDKOThxF_6Hj7t9jXdHGJ7HeKinOQrik2aY0BgSIs8Z0fn4aG2lyzo9v81scQl7ruQB1Xzw",
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchUpdates() {
      if (session && session.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("updated_at")
          .eq("id", session.user.id);
        if (error) {
          console.log("error: ", error.message);
        }

        if (data[0].updated_at == null) {
          router.navigate("/welcome");
        }
      }
    }

    fetchUpdates();
  });

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
    {
      path: "/recents",
      element: <Recents session={session} />,
    },
    {
      path: "leaderboard/user/:id",
      element: <User session={session} />,
    },
  ]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        localization={{
          variables: {
            sign_in: {
              email_label: "Вашия имейл адрес",
              password_label: "Вашата сигурна парола",
              email_input_placeholder: "pencho_silata@gmail.com",
              password_input_placeholder: "silnaparola123",
              button_label: "Влез",
              loading_button_label: "Един момент...",
              social_provider_text: "Влезте с Google",
              link_text: "Имате профил? Влезте",
              confirmation_text: "Проверете имейла си, за да го повърдите",
            },
            sign_up: {
              email_label: "Вашия имейл адрес",
              password_label: "Вашата сигурна парола",
              email_input_placeholder: "Въведете вашия имейл адрес тук",
              password_input_placeholder:
                "Въведете вашата сигурна парола адрес тук",
              button_label: "Присъедини се",
              loading_button_label: "Един момент...",
              social_provider_text: "Влезте с Google ",
              link_text: "Нямате профил? Присъединете се",
              confirmation_text: "Проверете имейла си, за да го повърдите",
            },
            forgotten_password: {
              link_text: "Забравена парола?",
              email_label: "Вашия имейл адрес",
              password_label: "Вашата сигурна парола",
              email_input_placeholder: "Имейла с който сте се регистрирали",
              button_label: "Променете паролата си",
              loading_button_label: "Един момент...",
              confirmation_text: "Проверете пощата си за линк",
            },
          },
        }}
      />
    );
  } else {
    return <RouterProvider router={router}></RouterProvider>;
  }
}
