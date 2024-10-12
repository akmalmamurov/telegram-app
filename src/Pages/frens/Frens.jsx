import { Link } from "react-router-dom";
import axios from "axios";
import * as API from "@/constants/api";
import { useCallback } from "react";
import { useFetchData } from "@/hooks";

const Frens = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const telegramUserId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setUserId(telegramUserId);
    } else {
      toast.error("Telegram user ID is not available.");
    }
  }, []);
  const { data: frens, error, refetch } = useFetchData("friends", userId);

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
    <div className="frens">
      {error ? (
        <div className="error text-white text-xl">{error}</div>
      ) : (
        <div className="font-jejuGothic">
          <h1 className="text-center text-[48px] font-normal text-white">
            Users: {frens?.user || 0}
          </h1>

          <div className="">
            <div className="px-[15px] py-5 bg-[#303b58] rounded-[15px] mt-[10px]">
              <div className="flex justify-between mb-4">
                <span className="text-white text-xl">My invite link</span>
                <div className="">
                  <button
                    className="px-3 py-2 bg-[#001eff] rounded-[8px] text-[13px] font-normal leading-[13.02px] text-white"
                    onClick={() => navigator.clipboard.writeText(frens?.link)}
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
              <div className="">
                {frens?.friends?.map((item) => (
                  <div
                    className="flex justify-between mb-3"
                    key={item.friend_pk}
                  >
                    <p className="text-white"> {item.name}</p>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frens;
