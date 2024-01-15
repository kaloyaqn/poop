import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import RecentsComponent from '../components/Information/RecentsComponent'
import { supabase } from '../lib/supabase';

const Recents = () => {
    const [recents, setRecents] = useState([]);

    async function fetchRecents() {
        const { data, error } = await supabase
          .from("poops")
          .select("*")
          .order("created_at", { ascending: false })
    
        // console.log(data);
        // console.log(error);
    
        if (error === null) {
          setRecents(data);
        }
      }

      useEffect(() => {
        fetchRecents();
      }, []);
  return (
    <Layout>
        
    </Layout>
  )
}

export default Recents