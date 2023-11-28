"use client";

import React, { useEffect, useState } from "react";
import { FullFriendshipType } from "@/app/types";
import { User } from "@prisma/client";
import UserBox from "./Userbox";
import axios from "axios";

interface FriendshipListProps {
  initialItems: FullFriendshipType[];
  users: User[];
}

const FriendshipList: React.FC<FriendshipListProps> = ({
  initialItems,
  users,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const term = event.target.value;
    setSearchTerm(term);

    try {
      // 검색어가 비어 있지 않은 경우에만 서버에 요청 보내기
      if (term.trim() !== "") {
        const response = await axios.post("/api/searchTerm", {
          searchTerm: term,
        });
        setFilteredUsers(response.data.filteredUsers);
      } else {
        // 검색어가 비어 있을 때는 전체 사용자 목록 가져오기
        setFilteredUsers(users);
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 전체 사용자 목록 가져오기
    setFilteredUsers(users);
  }, [users]);

  return (
    <div>
      <aside
        className="
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0
        "
      >
        <div className="px-5">
          <div className="flex-col">
            <div
              className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    py-4
                "
            >
              친구 추가
            </div>
            <input
              type="text"
              placeholder="이름으로 검색"
              className="
                    w-full
                    p-2
                    mb-4
                    border
                    border-gray-300
                    rounded
                "
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* 검색된 사용자 목록을 표시 */}
            {filteredUsers &&
              filteredUsers.map((user) => (
                <UserBox key={user.id} data={user} onClose={handleClose} />
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
export default FriendshipList;
