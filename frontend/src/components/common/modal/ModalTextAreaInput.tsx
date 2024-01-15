import { forwardRef, RefObject } from "react";
interface ModalTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const ModalTextAreaInput = forwardRef<HTMLInputElement, ModalTextInputProps>(
  function ModalTextAreaInput({ className, ...props }, ref) {
    return (
      <input
        className={`mt-2 w-72 rounded-xl bg-[#27272a] px-2 py-2 ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);
