import { CoinClickIcon, CoinIcon } from "@/assets/icons";
import "./Earn.css";
import { useCallback, useState, useEffect } from "react";
import { useFetchData } from "@/hooks";
import axios from "axios";
import * as API from "@/constants/api";
import { formatNumberWithSpaces } from "@/utils";

const Earn = () => {
  const userId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  const { data: earn, refetch } = useFetchData("main-page", userId);
  const [isClicked, setIsClicked] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const [maxCoin, setMaxCoin] = useState(0);
  localStorage.setItem("userCoin", earn?.user_coin);
  useEffect(() => {
    if (earn) {
      setMaxCoin(earn?.max_coin);
    }
  }, [earn]);

  const handleClick = useCallback(async () => {
    if (maxCoin > 0) {
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
    } else {
      console.log("Maximum coin limit reached!");
    }
  }, []);

  return (
    <div className="w-full font-jomhuria">
      <div className="flex justify-center gap-2 items-center">
        <CoinIcon className={`mb-3 ${isClicked ? "coin-click" : ""}`} />
        <span
          className={`text-white text-[96px] ${
            isClicked ? "coin-increment" : ""
          }`}
        >
          {formatNumberWithSpaces(earn?.user_coin)}
        </span>
      </div>

      <div className="flex flex-col items-center my-20 relative coin-click">
        {showIncrement && (
          <div className="coin-increment-animation absolute top-[-120px] text-[56px] text-white">
            +{earn?.add_coin}
          </div>
        )}
        <button onClick={handleClick} disabled={maxCoin <= 0}>
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
            <clipPath id="clip0_438_13)">
              <rect width="20" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-white text-[20px]">
          {formatNumberWithSpaces(`${maxCoin} / ${earn?.limit_coin}`)}
        </span>
      </div>
    </div>
  );
};

export default Earn;
