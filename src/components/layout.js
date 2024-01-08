import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from './Navigation/Header';
import Footer from './Navigation/Footer';
import toast, { Toaster } from 'react-hot-toast';


const Layout =({children}) =>{
    // const [session, setSession] = useState([]);

    // async function VzemameUser() {
    //     const {
    //       data: { user },
    //     } = await supabase.auth.getUser();
    //     setSession(user);
    //     if (user) {
    //       console.log("ima sesiq da ");
    //     } else {
    //       console.log("cent nqma sesiq");
    //     }
    //   }
    
    //   useEffect(() => {
    //     VzemameUser();
    //   }, [children]);
    return(
        <>
        <Toaster />
        <Header />
        <main>{children}</main>
        <Footer />
        </>
    )
}

export default Layout;