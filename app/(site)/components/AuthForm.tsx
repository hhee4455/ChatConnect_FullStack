"use client"; // 미리 정의된 클라이언트를 사용하겠다는 선언

import axios from "axios";
import Button from "@/app/components/Button"; // 버튼 컴포넌트를 가져옴
import Input from "@/app/components/inputs/input"; // 입력 컴포넌트를 가져옴

import { BsGithub, BsGoogle } from "react-icons/bs"; // React Icons 라이브러리에서 아이콘을 가져옴
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { useCallback, useEffect, useState } from "react"; // React에서 사용할 useCallback과 useState를 가져옴
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"; // react-hook-form 라이브러리에서 필요한 요소들을 가져옴
import AuthSocialButton from "./AuthSocialButton"; // 소셜 로그인 버튼 컴포넌트를 가져옴
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// "LOGIN" 또는 "REGISTER" 중 하나의 문자열 값을 가질 수 있는 타입을 정의
type Variant = "LOGIN" | "REGISTER";

// 함수형 컴포넌트 AuthForm 선언
const AuthForm = () => {
  // 현재 폼의 상태를 나타내는 variant와 isLoading 상태를 useState를 통해 정의
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  // 버튼을 클릭할 때 variant 상태를 토글하는 함수를 정의
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // react-hook-form을 사용하여 폼의 상태와 유효성 검사를 처리하기 위한 설정을 정의
  const {
    register, // 입력 필드를 등록하는 함수
    handleSubmit, // 폼 제출 핸들러
    formState: { errors }, // 폼의 에러 상태
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 폼이 제출될 때 실행되는 함수
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("잘못 입력됐습니다!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("잘못 됐습니다.");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("로그인 성공!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  // 소셜 로그인 액션을 처리하는 함수
  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth를 사용한 소셜 로그인 처리
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("잘못 됐습니다.");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("로그인 성공!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  // 반환되는 JSX 요소 (React 컴포넌트의 렌더링 결과)
  return (
    <div
      className="
      mt-8                 
      sm:mx-auto            
      sm:w-full             
      sm:max-w-md"
    >
      <div
        className="
        bg-white            
        px-4                 
        py-8                 
        shadow               
        sm:rounded-lg        
        sm:px-10"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="이름"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          {/* 등록 모드("REGISTER")일 때 이름 입력 필드 표시 */}
          <Input
            id="email"
            label="이메일"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          {/* 이메일 입력 필드 표시 */}
          <Input
            id="password"
            label="비밀번호"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          {/* 비밀번호 입력 필드 표시 */}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
          {/* 로그인 또는 등록 버튼 표시 */}
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                "
            >
              <div
                className="
              w-full
              border-t 
              border-gray-300"
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">소셜 로그인</span>
            </div>
          </div>
          {/* 수평 구분선 및 "or continue with" 텍스트 표시 */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={RiKakaoTalkFill}
              onClick={() => socialAction("kakao")}
            />
            <AuthSocialButton
              icon={SiNaver}
              onClick={() => socialAction("naver")}
            />
          </div>
          {/* 소셜 로그인 버튼 표시 (GitHub 및 Google) */}
        </div>
        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "아직 회원이 아니세요?"
              : "이미 회원이신가요?"}
          </div>
          {/* 로그인 또는 등록 링크 텍스트 표시 */}
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "회원가입" : "로그인"}
          </div>
          {/* 로그인 또는 등록 링크 표시 및 토글 기능 제공 */}
        </div>
      </div>
    </div>
  );
};

export default AuthForm; // AuthForm 컴포넌트를 내보냄
