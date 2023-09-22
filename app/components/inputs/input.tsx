// "use client" 문자열은 클라이언트에서 사용할 미리 정의된 설정을 지정하는 것으로 보입니다.
"use client";

// clsx 라이브러리를 가져옵니다. 클래스 이름을 동적으로 결합하는 데 사용될 수 있습니다.
import clsx from "clsx";

// react-hook-form 라이브러리에서 필요한 요소들을 가져옵니다.
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

// InputProps 인터페이스를 정의합니다. 이는 Input 컴포넌트에 전달되는 속성들을 설명합니다.
interface InputProps {
  label: string; // 입력 필드 레이블의 문자열
  id: string; // 입력 필드의 고유 ID 문자열
  type?: string; // 입력 필드의 타입 (선택적)
  required?: boolean; // 필수 입력 필드 여부 (선택적)
  register: UseFormRegister<FieldValues>; // react-hook-form의 register 함수
  errors: FieldErrors; // 입력 필드의 유효성 검사 오류
  disabled?: boolean; // 입력 필드 비활성화 여부 (선택적)
}

// Input 컴포넌트를 정의합니다.
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      {/* 입력 필드 레이블 */}
      <label
        className="
      block
      text-sm
      font-medium
      leading-5
      text-gray-900
      "
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        {/* 입력 필드 */}
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            // 입력 필드에 적용되는 CSS 클래스
            `form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2 
            focus:ring-inset
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500", // 오류가 있을 경우 빨간색 테두리를 추가
            disabled && "opacity-50 cursor-default" // 비활성화 상태일 경우 투명도 및 커서 설정
          )}
        />
      </div>
    </div>
  );
};

// Input 컴포넌트를 내보냅니다.
export default Input;
