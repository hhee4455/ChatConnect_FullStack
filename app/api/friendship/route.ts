import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }

    if (request.headers.get("X-Cancel-Friendship")) {
      // 모달이 닫힐 때 취소 작업 수행
      console.log("모달이 닫힐 때 취소 작업을 수행합니다.");
      return new NextResponse("Friendship cancellation successful", {
        status: 200,
      });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      // 중복 추가 시 특정 플래그를 추가하여 클라이언트에서 확인할 수 있도록 함
      return NextResponse.json({
        error: "Duplicate friend addition",
        conversation: singleConversation,
      });
    }

    // Retrieve userToAdd
    const userToAdd = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    if (!userToAdd) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Create friendship
    const friendship = await prisma.friendship.create({
      data: {
        userA: {
          connect: { id: currentUser.id },
        },
        userB: {
          connect: { id: userId },
        },
      },
    });

    // Create conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
              name: currentUser.name,
              image: currentUser.image,
            },
            {
              id: userId,
              name: userToAdd.name,
              image: userToAdd.image,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
