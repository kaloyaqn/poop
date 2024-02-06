import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Avatar from "../components/Avatar";
import Layout from "../components/layout";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import toast from "react-hot-toast";
import { Textarea } from "../components/ui/textarea";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isReportOpened, seIsReportOpened] = useState(false);
  const [reportText, setReportText] = useState("");

  async function getProfile() {
    setLoading(true);
    const { user } = session;

    const { data, error } = await supabase
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", user.id)
      .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        console.log(avatar_url);
      }

    setLoading(false);
  }



  useEffect(() => {
    if (!session || !session.user) {
      return;
    } else {
      getProfile();

    }

  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
      toast.success("Успешно обновихте профила си")
    }
    setLoading(false);
  }

  return (
    <Layout>
      <form onSubmit={updateProfile} className="form-widget">
        <div className="w-full flex items-center justify-center">
        <Avatar
          url={avatar_url}
          size={150}
          hasUpload={true}
          onUpload={(event, url) => {
            updateProfile(event, url);
          }}
          setAvatarUrl={setAvatarUrl}
          avatarUrl={avatar_url}
        />
        </div>

        <div className="mb-3">
          <label
            for="small-input"
            class="block mb text- font-medium text-gray-900 dark:text-white manrope"
          >
            Имейл
          </label>
          <input
            disabled
            type="text"
            value={session.user.email}
            id="small-input"
            class="block w-full p-2 text-[#655D56]  manrope border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-[#6A3A0B] focus:border-[#C8986C]"
          />
        </div>
        {/* <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div> */}
        <div className="">
          <label
            for="small-input"
            class="block mb text- font-medium text-gray-900 dark:text-white manrope"
          >
            Псевдоним
          </label>
          <input
            
            type="text"
            id="small-input"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)} 
            class="block w-full p-2 text-[#655D56]  manrope border transition border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-[#6A3A0B] focus:border-[#6A3A0B]"
          />
        </div>
        <div>
          <PrimaryBtn
            className="button block primary mt-4 p-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Обновяване..." : "Обнови"}
          </PrimaryBtn>
        </div>
      </form>

        <div className="mt-6">


        <a href="https://n383msp4fjw.typeform.com/to/oiIn9gVb">
        <button onClick={() => seIsReportOpened(false)} className="bg-yellow-200 w-full p-2 rounded-[8px]">Докладвай проблем</button>

        </a>

        </div>

        <div className="absolute bottom-[100px] w-full left-0 px-[20px]">
          <button
            className="bg-red-200 w-full p-2 text-sm rounded-[8px]"
            onClick={() => {
              const { error } = supabase.auth.signOut();
            }}
          >
            Излез 
          </button>
        </div>
    </Layout>
  );
}