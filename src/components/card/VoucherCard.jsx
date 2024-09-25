import { ArrowRightIcon, TaskCoinIcon, VoucherIcon } from "@/assets/icons";
import { formatNumberWithSpaces } from "@/utils";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import * as API from "@/constants/api";
import axios from "axios";

const VoucherCard = (props) => {
  const { name, coin, som, userId, id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const userCoin = parseInt(localStorage.getItem("userCoin"), 10) || 0;
    if (userCoin >= coin) {
      setIsModalOpen(true);
    } else {
      toast.error("Sizning coiningiz yetarli emas");
    }
  };

  const handlePut = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${API.ENDPOINT}/${API.VOUCHERS}/${userId}/?voucher_id=${id}`
      );
      console.log(res.message);
      toast.success("Sizning Voucheringiz muvaffaqiyatli qabul qilindi");
    } catch (error) {
      console.error("Error redeeming voucher:", error);
      toast.error("Sms yuborilmadi");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-[#303B58] mb-3 rounded-[10px] px-[14px] py-[19px] cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[25px]">
            <VoucherIcon />
            <div>
              <h1 className="font-kavivanar text-white">{name}</h1>
              <div className="flex items-center gap-[14px]">
                <div className="flex items-center gap-[5px] font-jomhuria text-[24px]">
                  <TaskCoinIcon />
                  <span className="text-white text-[24px] leading-[24px] mt-1">
                    {formatNumberWithSpaces(coin)} - <span>{som} So'm</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      <Dialog
        size="xs"
        className="bg-[#1a1c30]"
        open={isModalOpen}
        handler={handleCancel}
      >
        <DialogBody>
          <h2 className="font-jetBrainsMono text-center text-white">
            Haqiqatdanham alishtirmoqchimisiz {coin} coinlarni {som} So'mga?
          </h2>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="red" onClick={handleCancel}>
            Yo'q
          </Button>
          <Button
            variant="gradient"
            color="blue"
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            onClick={handlePut}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Hа"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default VoucherCard;
