import type { Config } from "tailwindcss";

// "tailwindcss"에서 가져온 "Config" 타입을 사용하여
// "config" 변수를 정의합니다.
const config: Config = {
  // "content" 속성은 Tailwind CSS에서 사용할 파일 경로를 지정합니다.
  // 이 파일 경로는 CSS를 생성할 때 사용됩니다.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // 페이지 파일 경로
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 컴포넌트 파일 경로
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 앱 파일 경로
  ],
  theme: {
    extend: {}, // 테마 확장 옵션을 비워둠
  },
  plugins: [
    // "@tailwindcss/forms" 플러그인을 사용하여
    // Tailwind CSS에 양식 스타일을 추가합니다.
    require("@tailwindcss/forms")({
      strategy: "class", // 클래스 전략을 사용하여 스타일을 적용합니다.
    }),
  ],
};

// "config" 객체를 내보냅니다.
export default config;
