import { SmCloseIcon } from "@/assets/icons";
import { useEffect } from "react";

const ErrorToast = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        open ? "flex justify-center" : "hidden"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="w-[254px] h-[30px] relative flex justify-center bg-[#C12323] rounded-[10px] mt-4 shadow-lg">
        <p className="text-white text-center font-jomhuria text-[24px]">
          Not enough coin to exchange.
        </p>
        <div
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <SmCloseIcon />
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
