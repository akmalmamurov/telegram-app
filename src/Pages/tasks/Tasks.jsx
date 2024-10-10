import { useFetchData } from "@/hooks";
import { CoinIcon, TaskCoinIcon } from "@/assets/icons";
import { Link } from "react-router-dom";
import TaskIcon from "@/assets/icons/TaskIcon";
import { formatNumberWithSpaces } from "@/utils";
import * as API from "@/constants/api";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Tasks = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const telegramUserId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setUserId(telegramUserId);
    } else {
      toast.error("Telegram user ID is not available.");
    }
  }, []);

  const { data: task, refetch } = useFetchData("tasks", userId);

  const handleUpdate = useCallback(
    async (task_pk) => {
      try {
        const res = await axios.put(
          `${API.ENDPOINT}/tasks-complete/${userId}/`,
          {},
          {
            params: {
              task_pk,
              is_complete: true,
            },
          }
        );
        console.log("Task completed response:", res.data);
        refetch();
      } catch (err) {
        console.error("Error updating task:", err);
      }
    },
    [userId, refetch]
  );

  const handleClaim = useCallback(
    async (task_pk) => {
      try {
        const res = await axios.put(
          `${API.ENDPOINT}/tasks-claimed/${userId}/`,
          {},
          {
            params: {
              task_pk,
            },
          }
        );
        console.log("Claim response:", res.data);
        refetch();
      } catch (err) {
        console.error("Error claiming reward:", err);
      }
    },
    [userId, refetch]
  );

  return (
    <div className="tasks font-jomhuria">
      <div className="flex justify-center gap-2 items-center">
        <CoinIcon className={`mb-3`} />
        <span className={`text-white text-[96px] tracking-wider`}>
          {formatNumberWithSpaces(task?.user_coin)}
        </span>
      </div>

      {task?.tasks.map((item, index) => (
        <div
          className="bg-[#303B58] mb-3 font-kavivanar rounded-[10px] px-[23px] py-4"
          key={index}
          onClick={() =>
            item.task_type !== "telegram" && !item.is_complete
              ? handleUpdate(item.task_pk)
              : null
          }
        >
          <Link
            to={item.task_link}
            target="_blank"
            className="flex justify-between text-white items-center"
          >
            <div className="flex gap-[14px] items-center">
              <span>
                <TaskIcon />
              </span>
              <div className="">
                <span className="mb-[2px] capitalize tracking-wider">
                  {item.task_name}
                </span>
                <div className="flex items-center gap-[5px] font-jomhuria text-[24px]">
                  <TaskCoinIcon className="mb-[4px]" />
                  {formatNumberWithSpaces(item.task_coin)}
                </div>
              </div>
            </div>
          </Link>

          {item.task_type !== "telegram" && (
            <div className="flex justify-end">
              {item.is_complete ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClaim(item.task_pk);
                  }}
                  className={`text-white bg-blue-600 px-4 text-xl rounded ${
                    item.is_claimed
                      ? "bg-gray-600 cursor-not-allowed opacity-80"
                      : ""
                  }`}
                >
                  Claim
                </button>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
