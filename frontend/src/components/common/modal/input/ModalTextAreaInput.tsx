import { forwardRef } from "react";
interface ModalTextInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}
export const ModalTextAreaInput = forwardRef<HTMLTextAreaElement, ModalTextInputProps>(
  function ModalTextAreaInput({ className, rows, ...props }, ref) {
    return (
      <textarea
        className={`mt-2  rounded-xl bg-[#27272a] px-2 py-2 outline-none ${className}`}
        ref={ref}
        rows={rows}
        {...props}
      />
    );
  },
);
