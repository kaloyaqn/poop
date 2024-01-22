import { useEffect, useState } from "react";
import PrucBox from "../Information/PrucBox";
import { supabase } from "../../lib/supabase";

export default function Truc({session, recents}) {
  return (
    <div className="flex flex-col gap-4">
        {recents.map((recent) => (
            <div key={recent.index}>
                <PrucBox recent={recent}/>
            </div>
        ))}

    </div>
  );
}
