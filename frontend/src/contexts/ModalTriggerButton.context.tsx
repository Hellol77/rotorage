import React, { createContext, ReactNode, useContext, useMemo } from "react";

const ModalTriggerButtonContext = createContext({
  onClick: false,
  handleCloseOnClick: () => {},
});

export const useModalTriggerButtonContext = () => useContext(ModalTriggerButtonContext);

export default function ModalTriggerButtonProvider({
  onClick,
  handleCloseOnClick,
  children,
}: {
  onClick: boolean;
  handleCloseOnClick: () => void;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      onClick,
      handleCloseOnClick,
    }),
    [handleCloseOnClick, onClick],
  );
  return (
    <ModalTriggerButtonContext.Provider value={value}>
      {children}
    </ModalTriggerButtonContext.Provider>
  );
}
