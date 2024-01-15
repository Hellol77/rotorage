interface ModalTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.MutableRefObject<HTMLInputElement | null> | undefined | string;
  className?: string;
}

export default function ModalTextInput({ className, ...props }: ModalTextInputProps) {
  return (
    <input className={`mt-2 w-72 rounded-xl bg-[#27272a] px-2 py-2 ${className}`} {...props} />
  );
}
