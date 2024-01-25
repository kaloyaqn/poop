import moment from "moment";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Avatar from "../Avatar";

export default function PrucBox({ recent, user, session }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [likesClient, setLikesClient] = useState(0);
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    // Fetch the user's avatar from Supabase storage
    setLikesClient(recent.likes)
    const downloadUserAvatar = async () => {
      try {
        const path = `avatars/${user.id}.jpg`; // Adjust the path as needed
        const { data: image, error } = await supabase.storage
          .from("avatars")
          .download(path, { onDownloadProgress: console.log });

        if (error) {
          if (error.message.includes("Object not found")) {
            setAvatarUrl(user.avatar_url); // Set the avatarUrl directly
          } else {
            throw error;
          }
        } else {
          const url = URL.createObjectURL(image);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.log("Error downloading user avatar: ", error.message);
      }
    };

    downloadUserAvatar();
  }, [user.id, user.avatar_url]);

  console.log(recent.id);

  async function Like() {
    if (isLiked === true) 
    {
      setLikesClient(likesClient - 1)
      setIsLiked(false);

      const { data, error } = await supabase
      .from("poops")
      .update({ likes: recent.likes - 1 })
      .eq("id", recent.id);

      console.log(data)
      console.log(error)

    if (error) {
      setLikesClient(likesClient + 1)
      setIsLiked(true);
    }
    setLikesClient(likesClient - 1)
    setIsLiked(false);

    } 
    else 
    {

      setLikesClient(likesClient + 1)
      setIsLiked(true);

      const { data, error } = await supabase
      .from("poops")
      .update({ likes: recent.likes + 1, liked_by: `{${session.user.id}}` })
      .eq("id", recent.id);

      console.log(data)
      console.log(error)

    if (error) {
      setLikesClient(likesClient - 1)
      setIsLiked(false);
    }
    }
  }

  return (
    <div className="rounded-[20px] bg-white p-4 pb-6">
      <div className="flex gap-2 items-center">
        <div className="bg-red-700 rounded-full">
          <Avatar url={avatarUrl} size={50} hasUpload={false} />
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm font-bold manrope text-[#161515]">
            {recent.username && <>{recent.username}</>}
          </h5>
          <span className="leading-3 text-xs manrope font-semibold text-[#655D56]">
            {moment(recent.created_at).startOf("hour").fromNow()}
          </span>
        </div>
      </div>
      <h4 className="text-base text-[#161515] font-medium mt-3 inter">
        Изаках <span className="text-[#655D56]">{recent.type}</span> лайно.{" "}
        <>
          Имам да кажа това по темата:{" "}
          <span className="text-[#655D56]">{recent.free_text}</span>
        </>
      </h4>
      <div className="mt-4 flex gap-2">
        <button onClick={() => Like()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="19"
            viewBox="0 0 24 19"
            fill="black"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.311 11.2415C19.6612 10.6677 19.8627 10.0009 19.8627 9.28877C19.8627 7.14374 18.0423 5.40486 15.7965 5.40486C15.6432 5.40486 15.4921 5.41369 15.3431 5.42945C16.5653 2.5869 14.5902 0 14.5902 0C13.3589 1.91663 10.7263 1.8988 10.5354 1.89492C10.5315 1.89492 10.5278 1.89468 10.524 1.89468C8.30362 1.89468 6.50016 3.59479 6.45965 5.70628C6.45901 5.70628 6.45836 5.70628 6.45777 5.70628C4.21207 5.70628 2.39153 7.44522 2.39153 9.59026C2.39153 10.246 2.56236 10.8634 2.86276 11.4052C1.2046 11.8952 0 13.3712 0 15.1161C0 17.2611 1.82049 19 4.06619 19H19.0419C21.2876 19 23.1081 17.2611 23.1081 15.1161C23.1081 13.0575 21.431 11.3739 19.311 11.2415Z"
              style={{ fill: isLiked ? " #5B3410" : "gray" }}
              />
          </svg>
        </button>

        <span className="text-sm">{likesClient}</span>
      </div>
    </div>
  );
}
