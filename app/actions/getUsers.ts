import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    // Prisma에서 가져온 사용자 데이터를 일치하는 형식으로 매핑
    const mappedUsers = users.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
      emailVerified: user.emailVerified ?? null,
      image: user.image ?? null,
      hashedPassword: user.hashedPassword ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      conversationIds: user.conversationIds ?? [],
      seenMessageIds: user.seenMessageIds ?? [],
    }));

    return mappedUsers;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;
