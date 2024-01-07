import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Layout =({children}) =>{
    const [session, setSession] = useState([]);

    async function VzemameUser() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setSession(user);
        if (user) {
          console.log("ima sesiq da ");
        } else {
          console.log("cent nqma sesiq");
        }
      }
    
      useEffect(() => {
        VzemameUser();
      }, [children]);
    return(
        <>
        <div>
            Navbar
        </div>
        <main>{children}</main>
        </>
    )
}

export default Layout;