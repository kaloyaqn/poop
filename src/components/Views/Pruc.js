import { useEffect, useState } from "react";
import PrucBox from "../Information/PrucBox";
import { supabase } from "../../lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import PrimaryBtn from "../Buttons/PrimaryBtn";

export default function Truc({ session, recents }) {
  const [users, setUsers] = useState([]);
  const [userRead, setUserRead] = useState(false); //za modala dava vreme dali butona e disablenat
  const [displayPopUp, setDisplayPopUp] = useState(false);


  const closePopUp = () => {
    localStorage.setItem("seenPopUpPrucLikes", true);
    setDisplayPopUp(false);
  };

  useEffect(() => {
    let returningUser = localStorage.getItem("seenPopUpPrucLikes");
    setDisplayPopUp(!returningUser);
    setTimeout(() => {
      setUserRead(false);
    }, 5000);
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, id")
        .order("poop_score", { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  

  return (
    <div className="flex flex-col gap-4 pb-5">
            <AlertDialog open={displayPopUp} onOpenChange={setDisplayPopUp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вече има лайкове 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Изсиранията и историята на изсиране са{" "}
              <span className="font-bold">Бета</span> версия на лайковете в <span className="font-bold">"Пръц"</span> е вече тук.
              Ако изпитате затруднения или намерите проблем може да пишете от бутон <span className="font-bold">"Докладвай проблем"</span> от менюто в профила.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <PrimaryBtn disabled={userRead} onClick={() => closePopUp()}>
              Разбрах 
            </PrimaryBtn>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {recents.map((recent) => (
        <>{recent.free_text && (
          <div key={recent.index}>
          {/* Find the corresponding user for the recent item based on user_id */}
          {users.map((user) => {
            if (user.id === recent.user_id) {
              return <PrucBox key={recent.index} user={user} recent={recent} session={session}/>;
            }
            return null;
          })}
        </div>
        )}</>
      ))}
    </div>
  );
}
