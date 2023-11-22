"use client";

import axios from "axios";
import { FullFriendshipType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";

interface UserBoxProps {
  data: FullFriendshipType;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.userB.id, // Assuming the current user is userA
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
  }, [data, router]);

  // 현재 사용자가 로그인한 상태에서 userB를 표시하도록 수정
  const displayUser = data.userB;

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
