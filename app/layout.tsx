// "globals.css" 스타일시트를 가져옵니다. 이 스타일시트는 전역 스타일을 정의합니다.
import "./globals.css";

// Next.js에서 제공하는 Metadata 타입을 가져옵니다.
import type { Metadata } from "next";

// Google Fonts에서 제공하는 Inter 폰트의 Latin 서브셋을 가져옵니다.
import { Inter } from "next/font/google";

// 커스텀 컨텍스트를 가져옵니다.
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

// Inter 폰트를 Latin 서브셋과 함께 초기화합니다.
const inter = Inter({ subsets: ["latin"] });

// 메타데이터 정보를 정의합니다.
export const metadata: Metadata = {
  title: "chatconnect",
  description: "chatconnect",
};

// RootLayout 컴포넌트를 정의합니다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 웹 페이지의 기본 언어를 영어(en)로 설정합니다.
    <html lang="en">
      {/* 페이지의 본문(body)에 Inter 폰트 클래스를 적용합니다. */}
      <body className={inter.className}>
        {/* AuthContext와 ToasterContext 컴포넌트를 렌더링하고, 자식 컴포넌트를 포함합니다. */}
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
