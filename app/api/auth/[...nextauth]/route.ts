import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";

import prisma from "@/app/libs/prismadb";

// AuthOptions 객체 정의
export const authOptions: AuthOptions = {
  // PrismaAdapter를 사용하여 데이터베이스 연결 설정
  adapter: PrismaAdapter(prisma),
  // 다양한 인증 프로바이더를 제공
  providers: [
    // GitHub 로그인 프로바이더 설정
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Google 로그인 프로바이더 설정
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
    // 사용자 지정 인증 프로바이더 (이메일 및 비밀번호)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" }, // 이메일 필드 설정
        password: { label: "password", type: "password" }, // 비밀번호 필드 설정
      },
      // 사용자 지정 로그인 함수 설정
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // 이메일 또는 비밀번호가 누락된 경우 오류 발생
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          // 사용자가 없거나 비밀번호가 해싱되어 저장되지 않은 경우 오류 발생
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          // 비밀번호가 일치하지 않는 경우 오류 발생
          throw new Error("Invalid credentials");
        }

        return user; // 유효한 사용자 반환
      },
    }),
  ],
  // 개발 환경에서 디버그 모드 활성화
  debug: process.env.NODE_ENV === "development",
  // 세션 설정
  session: {
    strategy: "jwt", // JWT 세션 전략 사용
  },
  // NextAuth에서 사용할 시크릿 키 설정
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth의 핸들러를 authOptions와 함께 설정
const handler = NextAuth(authOptions);

// 핸들러를 내보냄 (GET 및 POST 요청에 대한 핸들러를 동일하게 사용)
export { handler as GET, handler as POST };
