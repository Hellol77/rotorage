"use client";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";

export default function AuthPage() {
  const { login } = useAuth();
  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>page</div>;
}
