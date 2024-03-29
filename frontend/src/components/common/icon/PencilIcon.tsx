import { IconPropsType } from "@/types/icon";

export default function PencilIcon({ onClick, className, size = "24" }: IconPropsType) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center bg-white stroke-gray-500  ${className} h-10 w-10 rounded-full `}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.232 5.23202L18.768 8.76802M16.732 3.73202C17.2009 3.26312 17.8369 2.99969 18.5 2.99969C19.1631 2.99969 19.7991 3.26312 20.268 3.73202C20.7369 4.20093 21.0003 4.8369 21.0003 5.50002C21.0003 6.16315 20.7369 6.79912 20.268 7.26802L6.5 21.036H3V17.464L16.732 3.73202Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
