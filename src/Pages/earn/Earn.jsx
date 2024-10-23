import { CoinClickIcon, CoinIcon } from "@/assets/icons";
import "./Earn.css";
import { useState, useEffect } from "react";
import { useFetchData } from "@/hooks";
import axios from "axios";
import * as API from "@/constants/api";
import { formatNumberWithSpaces } from "@/utils";
import useTelegramStore from "@/context/telegram";

const Earn = () => {
  const { userId } = useTelegramStore();

  const [isClicked, setIsClicked] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const [maxCoin, setMaxCoin] = useState(0);
  const { data: earn, refetch } = useFetchData("main-page", userId);

  useEffect(() => {
    if (earn) {
      localStorage.setItem("userCoin", earn.user_coin);
      setMaxCoin(earn.max_coin);
    }
  }, [earn]);

  const handleClick = async () => {
    try {
      const addCoin = earn?.add_coin || 0;
      const res = await axios.put(
        `${API.ENDPOINT}/main-page/${userId}/`,
        {},
        {
          params: {
            add_coin: addCoin,
          },
        }
      );

      console.log("Coin added response:", res.data);

      setIsClicked(true);
      setShowIncrement(true);

      setTimeout(() => setShowIncrement(false), 1000);

      refetch();
    } catch (err) {
      console.error("Error adding coin:", err);
    }
  };

  return (
    <div className="w-full font-jomhuria">
      <div className="flex justify-center gap-2 items-center">
        <CoinIcon
          className={`mb-2 w-10 h-10 ${isClicked ? "coin-click" : ""}`}
        />
        <span
          className={`text-white text-[56px] leading-none ${
            isClicked ? "coin-increment" : ""
          }`}
        >
          {formatNumberWithSpaces(earn?.user_coin)}
        </span>
      </div>

      <div className="flex flex-col items-center my-14 relative coin-click">
        {showIncrement && (
          <div className="coin-increment-animation absolute top-[-120px] text-[56px] text-white">
            +{earn?.add_coin}
          </div>
        )}
        <button
          className="cursor-pointer"
          onClick={handleClick}
          disabled={maxCoin <= 0}
        >
          <CoinClickIcon />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_438_13)">
            <path
              d="M0 15.9997H9.26471L6.04353 28L20.1682 12.0003H10.9035L14.1176 0L0 15.9997Z"
              fill="#FBD772"
            />
          </g>
          <defs>
            <clipPath id="clip0_438_13">
              <rect width="20" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-white text-[20px]">
          {formatNumberWithSpaces(`${maxCoin} / ${earn?.limit_coin || 0}`)}
        </span>
      </div>
    </div>
  );
};

export default Earn;
