"use client";

import axios from "axios";
import { FullFriendshipType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";

interface UserBoxProps {
  data: FullFriendshipType;
  currentUser: User | null; // 현재 사용자 정보 추가
}

const UserBox: React.FC<UserBoxProps> = ({ data, currentUser }) => {
  const router = useRouter();

  // currentUser 또는 data가 정의되지 않았을 경우 오류 방지
  if (!currentUser || !data) {
    console.error("currentUser or data is undefined.");
    return null; // 또는 오류 처리에 맞게 반환
  }

  // data.userA 또는 data.userB가 정의되지 않았을 경우 오류 방지
  const displayUser =
    currentUser.id === (data.userA?.id || data.userB?.id)
      ? data.userB
      : data.userA;

  if (!displayUser) {
    console.error("Display user is undefined.");
    return null; // 또는 오류 처리에 맞게 반환
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: displayUser.id, // displayUser를 사용
        isGroup: false,
      })
      .then((response) => {
        const conversationId = response.data?.id;
        if (conversationId) {
          router.push(`/conversations/${conversationId}`);
        } else {
          // Handle error case
          console.error("Failed to create conversation");
        }
      })
      .finally(() => setIsLoading(false));
  }, [displayUser, router]);

  return (
    <div
      onClick={handleClick}
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
      <Avatar user={displayUser} />
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
              {displayUser.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
