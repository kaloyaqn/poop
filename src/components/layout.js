import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Header from "./Navigation/Header";
import Footer from "./Navigation/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const Layout = ({ children }) => {
  return (
    <>
      <Toaster />
      <Header />
      <main>
        {children}
        <Analytics />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
