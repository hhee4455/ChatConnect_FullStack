"use client";

import React, { useState } from "react";
import { FullFriendshipType } from "@/app/types";
import { User } from "@prisma/client";
import UserBox from "./Userbox";

interface FriendshipListProps {
  initialItems: FullFriendshipType[];
  users: User[];
}

const FriendshipList: React.FC<FriendshipListProps> = ({
  initialItems,
  users,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const itemsArray = Array.isArray(initialItems) ? initialItems : [];

  const filteredItems = itemsArray.filter(
    (item) =>
      item.userB &&
      item.userB.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {/* 여기에 친구 목록을 표시하는 로직 추가 */}
            <ul className="space-y-2">
              {filteredItems.map((item) => (
                <li key={item.id} className="border-b border-gray-200 py-2">
                  {item.userB?.name || "이름 없음"}
                </li>
              ))}
            </ul>
            {users.map((user) => (
              <UserBox key={user.id} data={user} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FriendshipList;
