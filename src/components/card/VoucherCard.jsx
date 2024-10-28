import {
  ArrowRightIcon,
  CloseIcon,
  InfoIcon,
  TaskCoinIcon,
  VoucherIcon,
} from "@/assets/icons";
import { formatNumberWithSpaces } from "@/utils";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import * as API from "@/constants/api";
import axios from "axios";
import SuccessToast from "../toast/SucessToast";
import ErrorToast from "../toast/ErrorToast";

const VoucherCard = (props) => {
  const { name, coin, som, userId, id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClick = () => {
    const userCoin = parseInt(localStorage.getItem("userCoin"), 10) || 0;
    if (userCoin >= coin) {
      setIsModalOpen(true);
    } else {
      setErrorOpen(true);
    }
  };

  const handlePut = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${API.ENDPOINT}/${API.VOUCHERS}/${userId}/?voucher_id=${id}`
      );
      console.log(res.message);
      setToastOpen(true); 
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
      {/* Voucher card */}
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

      {/*  Toast */}
      <SuccessToast open={toastOpen} setOpen={setToastOpen} />
      <ErrorToast open={errorOpen} setOpen={setErrorOpen} />
      {/* Modal */}
      <Dialog
        size="xs"
        className="bg-[#303B58] rounded-[24px]"
        open={isModalOpen}
        handler={handleCancel}
      >
        <DialogHeader className="py-2">
          <div className="flex justify-end w-full">
            <button>
              <CloseIcon onClick={handleCancel} />
            </button>
          </div>
        </DialogHeader>
        <DialogBody className="py-0 px-2">
          <div className="flex flex-col items-center">
            <span className="mb-3">
              <InfoIcon />
            </span>
            <p className="font-jomhuria text-[32px] text-white text-center leading-6 flex flex-col">
              Do you really want to get a <span>voucher?</span>
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2 flex justify-center">
          <Button
            className="w-[100px] bg-[#E14736] capitalize h-[37px] flex items-center justify-center rounded-[15px] font-semibold text-base"
            onClick={handleCancel}
          >
            No
          </Button>
          <Button
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } w-[100px] bg-[#4CA659] capitalize h-[37px] flex items-center justify-center rounded-[15px] font-semibold text-base`}
            onClick={handlePut}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default VoucherCard;
