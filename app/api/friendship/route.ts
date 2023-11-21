import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name, searchTerm } = body;

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

      // 친구 목록에 새로 생성된 대화 상자의 사용자들을 추가
      const conversationUsers = newConversation.users.map((user) => user.id);

      // 현재 사용자를 제외한 나머지 사용자들과의 친구 관계 생성
      const friendshipData = conversationUsers
        .filter((userId) => userId !== currentUser.id)
        .map((userId) => ({
          userAId: currentUser.id,
          userBId: userId,
        }));

      await prisma.friendship.createMany({
        data: friendshipData,
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

    // 이미 친구인지 확인
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            userAId: currentUser.id,
            userBId: userId,
          },
          {
            userAId: userId,
            userBId: currentUser.id,
          },
        ],
      },
    });

    if (existingFriendship) {
      // 이미 친구인 경우
      return NextResponse.json({
        error: "Already friends",
      });
    }

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
        userAId: currentUser.id,
        userBId: userId,
      },
    });

    // 대화 생성 부분을 비활성화했으므로 주석 처리

    return NextResponse.json({
      result: "Success",
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
