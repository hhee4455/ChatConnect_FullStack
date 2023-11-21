import getFriend from "../actions/getFriend";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export const config = {
  api: {
    // Edge Runtime을 사용하도록 설정
    externalResolver: true,
  },
};

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
