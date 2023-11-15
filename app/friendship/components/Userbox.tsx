"use client";

import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal"; // 가정: Modal 컴포넌트가 존재

interface UserBoxProps {
  data: User;
  onClose: () => void;
}

const UserBox: React.FC<UserBoxProps> = ({ data, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddFriend = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/friendship", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/friendship/${data.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
        setShowConfirm(false);
      });
  }, [data, router]);

  return (
    <div
      onClick={() => setShowConfirm(true)}
      className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
    "
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                flex
                justify-between
                items-center
                mb-1
                "
          >
            <p
              className="
                text-sm
                font-medium
                text-gray-900
            "
            >
              {data.name}
            </p>
          </div>
        </div>
      </div>
      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)}>
          <div className="flex flex-col items-center justify-center">
            <p
              className="
      mt-6
      text-center
      text-3xl
      font-bold
      tracking-tight
      text-gray-900
    "
            >
              친구 추가 확인
            </p>
            <div className="flex mt-4 space-x-4">
              <button
                onClick={handleAddFriend}
                disabled={isLoading}
                className="
                  bg-blue-500 
                  hover:bg-blue-700 
                  text-white 
                  font-bold 
                  py-2 
                  px-4 
                  rounded
                "
              >
                확인
              </button>
              <button
                type="button"
                className=" 
                  bg-red-600
                  hover:bg-red-700 
                  text-white 
                  font-bold 
                  py-2 
                  px-4 
                  rounded
                "
                onClick={onClose}
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserBox;
