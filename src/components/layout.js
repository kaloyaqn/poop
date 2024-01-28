import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Header from "./Navigation/Header";
import Footer from "./Navigation/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import DevBox from "./Information/DevBox";

const Layout = ({ children, session }) => {
  return (
    <>
      <Toaster />
      <Header session={session} />
      <main>
        {session.user.id === "21b71842-5543-4cfd-914a-2d808d00fe89" && (
          <DevBox />
        )} 
        {children}
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
