import { Link } from "react-router-dom";
import axios from "axios";
import * as API from "@/constants/api";
import { useCallback, useState } from "react";
import { useFetchData } from "@/hooks";
import useTelegramStore from "@/context/telegram";
import { UserIcon } from "@/assets/icons";
import "./Frens.css";
const Frens = () => {
  const { userId } = useTelegramStore();
  const { data: frens, error, refetch } = useFetchData("friends", userId);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(frens?.link);
    setShowCopyMessage(true);

    setTimeout(() => {
      setShowCopyMessage(false);
    }, 2000);
  };

  const handleUpdate = useCallback(
    async (friend_pk) => {
      try {
        const isDone = true;
        const res = await axios.put(
          `${API.ENDPOINT}/${API.FRENS}/${userId}/`,
          {},
          {
            params: {
              friend_pk,
              is_done: isDone,
            },
          }
        );
        console.log("Response:", res.data);
        refetch();
      } catch (err) {
        console.error("Error:", err);
      }
    },
    [refetch, userId]
  );

  return (
    <div className="relative">
      {error ? (
        <div className="error text-white text-xl">{error}</div>
      ) : (
        <div className="font-jejuGothic">
          <h1 className="text-center text-[48px] font-normal text-white mb-[13px]">
            Users: {frens?.user_count || 0}
          </h1>

          <div className="px-[15px] py-5 bg-[#303b58] rounded-[15px]  mb-5">
            <div className="flex justify-between mb-4">
              <span className="text-white text-xl">My invite link</span>
              <div className="">
                <button
                  className="px-3 py-2 bg-[#001eff] rounded-[8px] text-[13px] font-normal leading-[13.02px] text-white"
                  onClick={handleCopyClick}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="mb-4">
              <Link
                to={frens?.link}
                target="_blank"
                className="text-[#8c8787] text-sm"
              >
                {frens?.link}
              </Link>
            </div>
          </div>

          <h1 className="mb-2 font-jejuGothic text-white font-normal text-[15px] pl-1">
            Friends
          </h1>
    
            {frens?.friends?.map((item, index) => (
              <div
                key={index}
                className="bg-[#303b58] px-[14.68px] py-[17px] rounded-[15px] mb-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[13px]">
                    <UserIcon />
                    <p className="text-white font-jomhuria font-normal text-[24px] leading-6">
                      {item.name}
                    </p>
                  </div>
                  <button
                    className={`px-3 py-2 bg-[#001eff] rounded-[8px] text-[13px] font-normal leading-[13.02px] text-white ${
                      item.is_done ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleUpdate(item.friend_pk)}
                    disabled={item.is_done}
                  >
                    {item.is_done ? "Completed" : `Get ${item.get_coin} Coin`}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {showCopyMessage && (
        <div className="absolute top-14 w-full flex justify-center font-jejuGothic">
          <div className=" bg-[#818181] text-white text-center py-2 px-4 rounded-md copy-message ">
            Copied!
          </div>
        </div>
      )}
    </div>
  );
};

export default Frens;
