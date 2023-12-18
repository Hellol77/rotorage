"use client";
import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function AuthPage() {
  const { login } = useAuth();
  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>page</div>;
}
