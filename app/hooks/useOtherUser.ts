import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    if (conversation?.users && currentUserEmail) {
      const otherUsers = conversation.users.filter(
        (user) => user.email !== currentUserEmail
      );

      if (otherUsers.length > 0) {
        return otherUsers[0];
      }
    }

    return null;
  }, [session?.data?.user?.email, conversation?.users]);

  return otherUser;
};

export default useOtherUser;
