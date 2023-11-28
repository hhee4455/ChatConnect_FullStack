import { User } from "@prisma/client";
import getFriend from "../actions/getFriend";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friend = await getFriend();
  const currentUser = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList
          items={friend}
          currentUser={currentUser ? currentUser[0] : null}
        />
        {children}
      </div>
    </Sidebar>
  );
}
