import moment from "moment";
import { supabase } from "../../lib/supabase";
import Avatar from "../Avatar";

export default function PrucBox({ recent, users }) {
  return (
    <div className="rounded-[20px] bg-white p-4 pb-6">
      <div className="flex gap-2 items-center">
        <div className="size-9 bg-red-700 rounded-full">
          <Avatar url={""} size={50} hasUpload={false} />
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm font-medium manrope text-[#161515]">
                        {recent.username && (
                <>{recent.username}</>
            )}
          </h5>
          <span className="leading-3 text-xs manrope font-semibold text-[#655D56]">
            {/* 4z {recent.created_at} */}
            {moment(recent.created_at).startOf('hour').fromNow() }
          </span>
        </div>
      </div>
      <h4 className="text-base text-[#161515] font-medium mt-3 inter">
        Изаках <span className="text-[#655D56]">{recent.type}</span> лайно. {recent.free_text && (
            <>
            Имам
        да кажа това по темата:{" "}
        <span className="text-[#655D56]">{recent.free_text}</span></>
        )}
      </h4>
    </div>
  );
}
