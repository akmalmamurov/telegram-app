import { useEffect, useState } from "react";
import { formatNumberWithSpaces } from "@/utils";
import {
  ArrowRightIcon,
  CoinIcon,
  EnergyIcon,
  MultiTapIcon,
  RechargingIcon,
  TaskCoinIcon,
} from "@/assets/icons";
import { useFetchData } from "@/hooks";
import { toast } from "react-toastify";
import request from "@/services";
import * as API from "@/constants/api";
const Boost = () => {
  const userId = 1878938651;
  // const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   const telegramUserId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  //   if (telegramUserId) {
  //     setUserId(telegramUserId);
  //   } else {
  //     toast.error("Telegram user ID is not available.");
  //   }
  // }, []);
  const { data: bost, refetch } = useFetchData("boosts", userId);
  console.log(bost);

  const handlePut = async (type) => {
    try {
      await request.put(
        `${API.ENDPOINT}/${API.BOOSTS}/${userId}/?type=${type}`
      );
      refetch();
      toast.success(`${type} muvaffaqiyatli qabul qilindi`);
    } catch (error) {
      toast.error("Xatolik yuz berdi", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-[#8C8787] font-kavivanar mb-3">
        Your Share balance
      </h1>

      <div className="flex justify-center gap-2 items-center font-jomhuria">
        <CoinIcon className={`mb-2 w-10 h-10`} />
        <span className={`text-white text-[56px] leading-none`}>
          {formatNumberWithSpaces(bost?.user_coin)}
        </span>
      </div>

      <div className="w-full py-[0] px-[24px]">
        <div className="border-b-[2px] border-[#303b58] my-[21px]"> </div>

        <h1 className="font-jomhuria text-[24px] text-white font-normal">
          Boosters:
        </h1>
        {/* Multitap */}
        <div
          onClick={() => handlePut("multitap")}
          className="bg-[#303B58] mb-3 font-kavivanar rounded-[10px] px-[18px] py-[22px] cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-[25px]">
              <MultiTapIcon />

              <div>
                <h1 className="font-kavivanar text-white ">Multitap</h1>
                <div className="flex items-center gap-[14px]">
                  <div className="flex items-center gap-[5px] font-jomhuria text-[24px]">
                    <TaskCoinIcon className="" />
                    <span className="text-white text-[24px] leading-[24px] mt-1">
                      {formatNumberWithSpaces(bost?.multitap?.coin)}
                    </span>
                  </div>
                  <div className="flex gap-[6px]">
                    <div className=" bg-[#8c8787] h-[24px] w-[4px]"></div>
                    <div className="font-hinaMincho">
                      <p className="text-sm text-[#8C8787] leading-[20px] mb-1">
                        Level {bost?.multitap?.level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        {/* Energy */}
        <div
          onClick={() => handlePut("energy_limit")}
          className="bg-[#303B58] mb-3 font-kavivanar rounded-[10px] px-[18px] py-[22px] cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-[25px]">
              <EnergyIcon />

              <div>
                <h1 className="font-kavivanar text-white ">Energy Limit</h1>
                <div className="flex items-center gap-[14px]">
                  <div className="flex items-center gap-[5px] font-jomhuria text-[24px]">
                    <TaskCoinIcon />
                    <span className="text-white text-[24px] leading-[24px] mt-1">
                      {formatNumberWithSpaces(bost?.energy_limit?.coin)}
                    </span>
                  </div>
                  <div className="flex gap-[6px]">
                    <div className=" bg-[#8c8787] h-[24px] w-[4px]"></div>
                    <div className="font-hinaMincho">
                      <p className="text-sm text-[#8C8787] leading-[20px] mb-1">
                        Level {bost?.energy_limit?.level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        {/* Recharging */}
        <div
          onClick={() => handlePut("recharging_speed")}
          className="bg-[#303B58] mb-3 font-kavivanar rounded-[10px] px-[18px] py-[22px] cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-[25px]">
              <RechargingIcon />

              <div>
                <h1 className="font-kavivanar text-white ">Recharging Speed</h1>
                <div className="flex items-center gap-[14px]">
                  <div className="flex items-center gap-[5px] font-jomhuria text-[24px]">
                    <TaskCoinIcon />
                    <span className="text-white text-[24px] leading-[24px] mt-1">
                      {formatNumberWithSpaces(bost?.recharging_speed?.coin)}
                    </span>
                  </div>
                  <div className="flex gap-[6px]">
                    <div className=" bg-[#8c8787] h-[24px] w-[4px]"></div>
                    <div className="font-hinaMincho">
                      <p className="text-sm text-[#8C8787] leading-[20px] mb-1">
                        Level {bost?.recharging_speed?.level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boost;
