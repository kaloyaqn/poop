import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Header from "./Navigation/Header";
import Footer from "./Navigation/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

const Layout = ({ children, session }) => {
  return (
    <>
      <Toaster />
      <Header session={session} />
      <main>
        {children}
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
