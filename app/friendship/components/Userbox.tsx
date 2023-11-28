import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import Modal from "./Modal";
import { User } from "@prisma/client";

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
      .then((response) => {
        if (
          response.data &&
          response.data.error === "Duplicate friend addition"
        ) {
        } else {
          const conversationId = response.data.id;
          if (conversationId) {
            router.push(`/friendship/${conversationId}`);
          } else {
            console.error("서버 응답에 conversationId가 없습니다.");
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.error("서버에서 내부 오류가 발생했습니다.");
        } else {
          console.error("알 수 없는 오류가 발생했습니다.", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setShowConfirm(false);
      });
  }, [data, router]);

  const handleCloseModal = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/friendship/cancel", {}) // 실제 서버의 엔드포인트에 맞게 수정
      .then(() => {
        console.log("모달이 닫힐 때 수행할 작업이 성공적으로 완료되었습니다.");
      })
      .catch((error) => {
        console.error("서버에서 내부 오류가 발생했습니다.", error);
      })
      .finally(() => {
        setIsLoading(false);
        setShowConfirm(false);
      });
  }, []);
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
        <Modal>
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
                onClick={handleCloseModal}
                disabled={isLoading}
                className=" 
                bg-red-600
                hover:bg-red-700 
                text-white 
                font-bold 
                py-2 
                px-4 
                rounded
              "
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
