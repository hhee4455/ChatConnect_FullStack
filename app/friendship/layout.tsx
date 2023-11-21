import getFriendships from "../actions/getFriendship";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import FriendshipList from "./components/FriendshipList";

export default async function FriendshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friendship = await getFriendships();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <FriendshipList initialItems={friendship} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
