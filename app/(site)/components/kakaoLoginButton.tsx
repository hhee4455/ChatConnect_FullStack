import React from "react";
import KakaoLogin from "react-kakao-login";
import { IconType } from "react-icons";

interface KakaoLoginButtonProps {
  onClick: () => void;
  icon: IconType;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  const kakaoClientId = process.env.KAKAO_CLIENT_ID || "";

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={() => {}}
      onFail={() => {}}
      render={(props) => (
        <button
          type="button"
          onClick={props.onClick}
          className="
            inline-flex
            w-full
            justify-center
            rounded-md
            bg-white
            px-4
            py-2
            text-gray-500
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            hover:bg-gray-50
            focus:outline-offset-0
          "
        >
          <Icon />
        </button>
      )}
    />
  );
};

export default KakaoLoginButton;
