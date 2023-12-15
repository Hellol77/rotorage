"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("code");
  useEffect(() => {
    console.log("login");
    axios
      .get(`/api/login/kakao?code=${search}`)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router, search]);

  return <div>page</div>;
}
