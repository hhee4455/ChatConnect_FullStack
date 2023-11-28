"use client";

import { FullFriendshipType } from "@/app/types";
import UserBox from "./Userbox";
import { User } from "@prisma/client";

interface UserListProps {
  items: FullFriendshipType[];
  currentUser: User | null;
}

const UserList: React.FC<UserListProps> = ({ items, currentUser }) => {
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
              친구
            </div>
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default UserList;
