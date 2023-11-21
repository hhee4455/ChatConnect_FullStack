import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { searchTerm } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    // 검색어를 사용하여 사용자 목록을 검색
    let filteredUsers;

    if (searchTerm) {
      filteredUsers = await prisma.user.findMany({
        where: {
          name: {
            contains: searchTerm,
          },
        },
      });
    } else {
      // 만약 검색어가 없다면 모든 사용자를 반환하거나, 필요에 따라 다른 로직을 추가하세요.
      // 예: 모든 사용자 목록을 반환하도록 설정
      filteredUsers = await prisma.user.findMany();
    }
    return NextResponse.json({
      result: "Success",
      filteredUsers,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const config = {
  // Edge Runtime을 사용하도록 설정
  api: {
    externalResolver: true,
  },
};