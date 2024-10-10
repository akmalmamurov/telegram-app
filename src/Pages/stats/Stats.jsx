import VoucherCard from "@/components/card/VoucherCard";
import { useFetchData } from "@/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Stats = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const telegramUserId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setUserId(telegramUserId);
    } else {
      toast.error("Telegram user ID is not available.");
    }
  }, []);

  const { data: voucher } = useFetchData("vouchers", userId);

  return (
    <div className="stats">
      <div className="coinCount">
        <div className="flex items-center flex-col font-jetBrainsMono">
          <h1 className="text-[#8C8787] text-[20px]">Total Voucher</h1>
          <h1 className="text-center text-white text-[32px]">
            {voucher?.voucher_count}
          </h1>
        </div>

        <div className="w-full py-[0] px-[24px]">
          <div className="border-b-[2px] border-[#303b58] my-[21px]"> </div>

          {voucher?.vouchers?.map((voucher) => (
            <VoucherCard key={voucher.id} {...voucher} userId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
