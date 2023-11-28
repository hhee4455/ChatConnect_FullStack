import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null; // 또는 오류 처리에 맞게 반환
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return user ? [user] : null; // 배열로 감싸거나 null을 반환
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return null; // 또는 오류 처리에 맞게 반환
  }
};

export default getUsers;
