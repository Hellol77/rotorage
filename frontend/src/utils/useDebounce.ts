import { useEffect, useState } from "react";

// export default function useDebounce(value: string, delay: number = 500) {
//   const [debounced, setDebounced] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debounced;
// }

export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => callback(...args), delay);
  };
};
