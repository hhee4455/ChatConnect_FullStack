import getFriend from "../actions/getFriend";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function FriendshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friend = await getFriend();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={friend} />
        {children}
      </div>
    </Sidebar>
  );
}

export const runtime = "edge";
