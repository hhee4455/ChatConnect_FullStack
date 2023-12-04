import Image from "next/image"; // Next.js에서 이미지를 렌더링하기 위한 Image 컴포넌트를 가져옵니다.
import AuthForm from "./components/AuthForm"; // 로그인 폼 컴포넌트를 가져옵니다.

export default function Home() {
  return (
    <div
      className="
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-100"
    >
      {/* 페이지의 상단 로고 */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2
          className="
                mt-6
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-gray-900"
        >
          Chat Conect 환영합니다.
        </h2>
      </div>

      {/* 로그인 폼을 렌더링합니다. */}
      <AuthForm />
    </div>
  );
}
//chat connect 완...
