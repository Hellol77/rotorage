"use client";
import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function AuthPage() {
  const { login } = useAuth();
  useEffect(() => {
    login();
  }, []);

  return <div>page</div>;
}
