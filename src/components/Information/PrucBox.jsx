import moment from "moment";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Avatar from "../Avatar";

export default function PrucBox({ recent, user }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Fetch the user's avatar from Supabase storage
    const downloadUserAvatar = async () => {
      try {
        const path = `avatars/${user.id}.jpg`; // Adjust the path as needed
        const { data: image, error } = await supabase.storage
          .from("avatars")
          .download(path, { onDownloadProgress: console.log });

        if (error) {
          // Handle the case where the image does not exist
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
        {recent.free_text && (
          <>
            Имам да кажа това по темата:{" "}
            <span className="text-[#655D56]">{recent.free_text}</span>
          </>
        )}
      </h4>
    </div>
  );
}
