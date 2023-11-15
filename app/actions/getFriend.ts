import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFriend = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            userAId: currentUser.id,
          },
          {
            userBId: currentUser.id,
          },
        ],
      },
      include: {
        userA: true,
        userB: true,
      },
    });

    return friendships;
  } catch (error: any) {
    return [];
  }
};

export default getFriend;
